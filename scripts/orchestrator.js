#!/usr/bin/env node

/**
 * SDLC Agent Orchestrator
 * Manages dependencies, spawn queue, and real-time coordination via SSE
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { AgentCoordinator, SharedContext, CollaborationLog } = require('./collaboration-framework');

// Phase and dependency definitions
const PHASES = [
  { name: 'Planning', agents: ['product-manager', 'business-analyst', 'software-architect', 'security-architect'] },
  { name: 'Design', agents: ['ux-researcher', 'ui-ux-designer', 'accessibility-engineer'] },
  { name: 'Development', agents: ['frontend-engineer', 'backend-engineer', 'database-engineer', 'mobile-developer', 'fullstack-engineer'] },
  { name: 'Testing & Security', agents: ['qa-manual-tester', 'automation-qa-engineer', 'appsec-engineer', 'penetration-tester'] },
  { name: 'Deployment', agents: ['devops-engineer', 'cloud-engineer', 'sre-engineer'] },
  { name: 'Operations & Support', agents: ['secops-analyst', 'data-engineer', 'engineering-manager', 'tech-lead', 'release-manager', 'performance-engineer', 'technical-writer'] },
];

const DEPENDENCIES = {
  'product-manager': [],
  'business-analyst': ['product-manager'],
  'software-architect': ['business-analyst'],
  'security-architect': ['software-architect'],
  'ux-researcher': ['business-analyst'],
  'ui-ux-designer': ['ux-researcher'],
  'accessibility-engineer': ['ux-researcher'],
  'frontend-engineer': ['ui-ux-designer'],
  'backend-engineer': ['software-architect'],
  'database-engineer': ['software-architect'],
  'mobile-developer': ['ui-ux-designer'],
  'fullstack-engineer': ['ui-ux-designer', 'software-architect'],
  'qa-manual-tester': ['frontend-engineer', 'backend-engineer'],
  'automation-qa-engineer': ['qa-manual-tester'],
  'appsec-engineer': ['backend-engineer'],
  'penetration-tester': ['automation-qa-engineer'],
  'devops-engineer': ['backend-engineer'],
  'cloud-engineer': ['devops-engineer'],
  'sre-engineer': ['cloud-engineer'],
  'secops-analyst': ['sre-engineer'],
  'data-engineer': ['backend-engineer'],
  'engineering-manager': ['sre-engineer'],
  'tech-lead': ['sre-engineer'],
  'release-manager': ['devops-engineer'],
  'performance-engineer': ['backend-engineer'],
  'technical-writer': ['frontend-engineer', 'backend-engineer'],
};

// CLI args
let projectDir = process.cwd();
let port = 4242;
let activeRunId = null;

for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === '--dir' && i + 1 < process.argv.length) {
    projectDir = path.resolve(process.argv[++i]);
  } else if (process.argv[i] === '--port' && i + 1 < process.argv.length) {
    port = parseInt(process.argv[++i], 10);
  } else if (process.argv[i] === '--run-id' && i + 1 < process.argv.length) {
    activeRunId = process.argv[++i];
  }
}

const sdlcDir = path.join(projectDir, '.sdlc');

// DependencyGraph: manages agent readiness
class DependencyGraph {
  isReady(agentName, completedAgents) {
    const deps = DEPENDENCIES[agentName] || [];
    return deps.every((dep) => completedAgents.includes(dep));
  }

  getReadyAgents(completedAgents) {
    const allAgents = Object.keys(DEPENDENCIES);
    return allAgents.filter((agent) => this.isReady(agent, completedAgents) && !completedAgents.includes(agent));
  }

  getDependencies(agentName) {
    return DEPENDENCIES[agentName] || [];
  }

  getBlocks(agentName) {
    const blocks = [];
    for (const [agent, deps] of Object.entries(DEPENDENCIES)) {
      if (deps.includes(agentName)) {
        blocks.push(agent);
      }
    }
    return blocks;
  }
}

// QueueManager: reads/writes queue.json
class QueueManager {
  constructor(runDir) {
    this.queueFile = path.join(runDir, 'queue.json');
  }

  getReady() {
    if (!fs.existsSync(this.queueFile)) {
      return [];
    }
    try {
      return JSON.parse(fs.readFileSync(this.queueFile, 'utf8'));
    } catch {
      return [];
    }
  }

  setReady(agents) {
    fs.writeFileSync(this.queueFile, JSON.stringify(agents, null, 2));
  }

  remove(agentName) {
    const queue = this.getReady();
    const idx = queue.indexOf(agentName);
    if (idx > -1) {
      queue.splice(idx, 1);
      this.setReady(queue);
    }
  }
}

// SSE Broadcaster
class SseBroadcaster {
  constructor() {
    this.clients = [];
  }

  addClient(res) {
    this.clients.push(res);
  }

  removeClient(res) {
    this.clients = this.clients.filter((c) => c !== res);
  }

  send(eventType, data) {
    this.clients.forEach((res) => {
      res.write(`event: ${eventType}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
  }
}

// AgentScheduler: monitors collaboration-log and updates queue
class AgentScheduler {
  constructor(runDir, depGraph, queueMgr, broadcaster, coordinator) {
    this.runDir = runDir;
    this.depGraph = depGraph;
    this.queueMgr = queueMgr;
    this.broadcaster = broadcaster;
    this.coordinator = coordinator;
    this.logFile = path.join(runDir, 'collaboration-log.json');
    this.lastSeenAgents = new Set();
    this.start();
  }

  start() {
    // Initial queue population
    this.updateQueue();

    // Watch for changes
    try {
      fs.watch(this.logFile, () => {
        setImmediate(() => this.updateQueue());
      });
    } catch {
      // Fallback: poll every 1 second if watch fails
      setInterval(() => this.updateQueue(), 1000);
    }
  }

  updateQueue() {
    try {
      const log = JSON.parse(fs.readFileSync(this.logFile, 'utf8'));
      const agents = log.agents || {};

      // Detect newly-completed agents
      const completed = Object.entries(agents)
        .filter(([_, agent]) => agent.status === 'complete')
        .map(([name, _]) => name);

      // Unblock ready agents
      const ready = this.depGraph.getReadyAgents(completed);
      this.queueMgr.setReady(ready);

      // Broadcast queue update
      this.broadcaster.send('queue-updated', {
        runId: activeRunId,
        readyAgents: ready,
      });
    } catch {
      // Ignore read errors during concurrent file access
    }
  }
}

// Initialize orchestrator state
const depGraph = new DependencyGraph();
const broadcaster = new SseBroadcaster();
let coordinator = null;
let scheduler = null;
let queueMgr = null;

// Initialize run directory and coordinator
function initializeRun(runId) {
  const runDir = path.join(sdlcDir, runId);

  if (!fs.existsSync(runDir)) {
    fs.mkdirSync(runDir, { recursive: true });
    fs.writeFileSync(path.join(runDir, 'context.json'), JSON.stringify(
      { project: { phase: 0, status: 'initialized' }, collaboration: { agents_involved: [], current_blockers: [] } },
      null,
      2,
    ));
    fs.writeFileSync(path.join(runDir, 'collaboration-log.json'), JSON.stringify({ messages: [], agents: {}, metrics: {} }, null, 2));
  }

  coordinator = new AgentCoordinator(runDir);
  queueMgr = new QueueManager(runDir);
  scheduler = new AgentScheduler(runDir, depGraph, queueMgr, broadcaster, coordinator);
  activeRunId = runId;

  return runDir;
}

// List available runs
function listRuns() {
  if (!fs.existsSync(sdlcDir)) {
    return [];
  }
  const entries = fs.readdirSync(sdlcDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && e.name.startsWith('run-'))
    .map((e) => e.name)
    .sort()
    .reverse();
}

// Get run status
function getRunStatus(runDir) {
  const logFile = path.join(sdlcDir, runDir, 'collaboration-log.json');
  if (!fs.existsSync(logFile)) {
    return 'unknown';
  }
  try {
    const log = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    const agents = log.agents || {};
    const statuses = Object.values(agents).map((a) => a.status || 'waiting');

    if (statuses.some((s) => s === 'working')) return 'running';
    if (statuses.some((s) => s === 'blocked')) return 'blocked';
    if (statuses.every((s) => s === 'complete')) return 'complete';
    return 'waiting';
  } catch {
    return 'error';
  }
}

// Extract start time from run-YYYYMMDDTHHMMSS
function getRunStartTime(runDir) {
  const match = runDir.match(/run-(\d{8}T\d{6})/);
  if (!match) return null;
  const isoStr = match[1].replace('T', '');
  const [, y, m, d, h, min, s] = isoStr.match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
  return new Date(`${y}-${m}-${d}T${h}:${min}:${s}Z`).toISOString();
}

// Count agents
function getCompletedAgents(runDir) {
  const logFile = path.join(sdlcDir, runDir, 'collaboration-log.json');
  if (!fs.existsSync(logFile)) return [0, 0];
  try {
    const log = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    const agents = Object.values(log.agents || {});
    const complete = agents.filter((a) => a.status === 'complete').length;
    return [complete, agents.length];
  } catch {
    return [0, 0];
  }
}

// Route handlers (reuse logic from ui-server.js)
function handleApiRuns(res) {
  const runs = listRuns();
  const summary = runs.map((runDir) => ({
    id: runDir,
    startedAt: getRunStartTime(runDir),
    status: getRunStatus(runDir),
    agents: { completed: getCompletedAgents(runDir)[0], total: getCompletedAgents(runDir)[1] },
  }));
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(summary, null, 2));
}

function handleApiRun(runId, res) {
  const runDir = path.join(sdlcDir, runId);
  if (!fs.existsSync(runDir)) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Run not found' }));
    return;
  }

  let context = null;
  let log = null;

  const contextFile = path.join(runDir, 'context.json');
  const logFile = path.join(runDir, 'collaboration-log.json');

  if (fs.existsSync(contextFile)) {
    try {
      context = JSON.parse(fs.readFileSync(contextFile, 'utf8'));
    } catch {}
  }

  if (fs.existsSync(logFile)) {
    try {
      log = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    } catch {}
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ context, log }, null, 2));
}

function handleApiArtifacts(runId, res) {
  const runDir = path.join(sdlcDir, runId);
  if (!fs.existsSync(runDir)) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Run not found' }));
    return;
  }

  try {
    const files = fs
      .readdirSync(runDir)
      .filter(
        (f) =>
          !f.startsWith('.') &&
          fs.statSync(path.join(runDir, f)).isFile() &&
          !['context.json', 'collaboration-log.json', 'queue.json'].includes(f),
      );

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(files, null, 2));
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Failed to list artifacts' }));
  }
}

function handleApiArtifactFile(runId, fileName, res) {
  const filePath = path.join(sdlcDir, runId, fileName);

  if (!filePath.startsWith(path.join(sdlcDir, runId))) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Access denied' }));
    return;
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'File not found' }));
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(content);
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Failed to read file' }));
  }
}

// HTTP Server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // GET /
  if (pathname === '/' && req.method === 'GET') {
    const uiFile = path.join(__dirname, 'ui', 'index.html');
    if (fs.existsSync(uiFile)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync(uiFile, 'utf8'));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('UI file not found');
    }
    return;
  }

  // GET /events (SSE)
  if (pathname === '/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
    broadcaster.addClient(res);
    req.on('close', () => broadcaster.removeClient(res));
    return;
  }

  // API routes
  if (pathname === '/api/runs' && req.method === 'GET') {
    handleApiRuns(res);
    return;
  }

  const apiRunMatch = pathname.match(/^\/api\/runs\/([^/]+)$/);
  if (apiRunMatch) {
    handleApiRun(apiRunMatch[1], res);
    return;
  }

  const apiArtifactsMatch = pathname.match(/^\/api\/runs\/([^/]+)\/artifacts$/);
  if (apiArtifactsMatch) {
    handleApiArtifacts(apiArtifactsMatch[1], res);
    return;
  }

  const apiArtifactFileMatch = pathname.match(/^\/api\/runs\/([^/]+)\/artifacts\/([^/]+)$/);
  if (apiArtifactFileMatch) {
    handleApiArtifactFile(apiArtifactFileMatch[1], apiArtifactFileMatch[2], res);
    return;
  }

  // GET /api/queue
  if (pathname === '/api/queue' && req.method === 'GET') {
    if (!queueMgr) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'No active run' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(queueMgr.getReady(), null, 2));
    return;
  }

  // GET /api/dependencies/:agent
  const depMatch = pathname.match(/^\/api\/dependencies\/([^/]+)$/);
  if (depMatch && req.method === 'GET') {
    const agent = depMatch[1];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      depends_on: depGraph.getDependencies(agent),
      blocks: depGraph.getBlocks(agent),
    }));
    return;
  }

  // POST /api/agent/spawn/:agent
  const spawnMatch = pathname.match(/^\/api\/agent\/spawn\/([^/]+)$/);
  if (spawnMatch && req.method === 'POST') {
    const agent = spawnMatch[1];
    if (coordinator) {
      coordinator.markWorking(agent);
      broadcaster.send('agent-status-changed', { runId: activeRunId, agentName: agent, status: 'working' });
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, agent }));
    return;
  }

  // POST /api/agent/complete/:agent
  const completeMatch = pathname.match(/^\/api\/agent\/complete\/([^/]+)$/);
  if (completeMatch && req.method === 'POST') {
    const agent = completeMatch[1];
    if (coordinator) {
      coordinator.markComplete(agent, []);
      broadcaster.send('agent-status-changed', { runId: activeRunId, agentName: agent, status: 'complete' });
      scheduler.updateQueue();
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, agent }));
    return;
  }

  // POST /api/agent/block/:agent
  const blockMatch = pathname.match(/^\/api\/agent\/block\/([^/]+)$/);
  if (blockMatch && req.method === 'POST') {
    const agent = blockMatch[1];
    if (coordinator) {
      const log = coordinator.collaborationLog.read();
      if (log.agents[agent]) {
        log.agents[agent].status = 'blocked';
        log.agents[agent].blocked_at = new Date().toISOString();
        coordinator.collaborationLog.write(log);
      }
      broadcaster.send('agent-status-changed', { runId: activeRunId, agentName: agent, status: 'blocked' });
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, agent }));
    return;
  }

  // POST /api/run/new
  if (pathname === '/api/run/new' && req.method === 'POST') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '').slice(0, 15);
    const newRunId = `run-${timestamp}`;
    initializeRun(newRunId);
    broadcaster.send('run-list-changed', { runs: listRuns() });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, runId: newRunId }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

// Startup
const runs = listRuns();
if (!activeRunId && runs.length > 0) {
  activeRunId = runs[0];
}

if (activeRunId) {
  initializeRun(activeRunId);
}

server.listen(port, '127.0.0.1', () => {
  console.log(`\n🎭 SDLC Orchestrator running at http://127.0.0.1:${port}`);
  console.log(`📁 Project: ${projectDir}`);
  console.log(`🏃 Active run: ${activeRunId || 'none'}`);
  console.log('\nPress Ctrl+C to stop.\n');
});
