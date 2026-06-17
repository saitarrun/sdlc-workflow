# SDLC Workflow Plugin

[![npm version](https://img.shields.io/npm/v/sdlc-ai-workflow?style=flat-square&color=blue)](https://www.npmjs.com/package/sdlc-ai-workflow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![SDLC Automation](https://img.shields.io/badge/SDLC-Automation-green?style=flat-square)](https://github.com/saitarrun/sdlc-ai-workflow)
[![Node.js](https://img.shields.io/badge/Node.js->=18.0.0-green?style=flat-square&logo=node.js)](https://nodejs.org/)

**Topics**: `sdlc` `workflow` `automation` `agents` `claude-code` `orchestration` `devops` `testing` `security` `code-review` `architecture` `ai-powered`

**AI-powered end-to-end software development orchestration** — 26 specialized agents collaborate across 6 SDLC phases with real-time monitoring and automated quality gates.

A complete SDLC Workflow in a Plugin: 26 agents across 6 phases, 43 knowledge skills, 14 commands. Covers planning → design → development → testing → deployment → operations, with industry-standard SDLC best practices embedded in every agent.

**Built for**: Claude Code users, development teams, automation engineers, DevOps practitioners

**Key Benefits**:
- **2-3x Speedup** — Parallel agent execution with automatic dependency management
- **Industry Standards** — QUANTS framework, INVEST criteria, Testing Pyramid, OWASP security
- **Zero External APIs** — Runs locally, file-based state, pure Node.js

### Built on Best Practices

- **Software Engineering** — QUANTS, INVEST, Critique/LGTM, Testing Pyramid, CI/CD
- **Architecture: The Hard Parts** — ADR, coupling/cohesion, fitness functions, service design
- **The Pragmatic Programmer** — DRY, ETC, tracer bullets, code generation
- **Clean Code** — naming, small functions, F.I.R.S.T. tests, SOLID

## Installation

### Option A: Global NPM (Recommended)

```bash
sudo npm install -g sdlc-ai-workflow
sdlc-ai-workflow install
```

Restart Claude Code. Done!

**Update later:**
```bash
sudo npm install -g sdlc-ai-workflow@latest
sdlc-ai-workflow install
```

---

## ⚠️ Breaking Changes in v1.3.0

### Dashboard Removed
- **Removed**: `npm run ui` command (web-based dashboard)
- **Removed**: `npm run init-dashboard` command
- **What to do**: Monitor progress in Claude Code terminal output instead. View artifacts in `.sdlc/run-<timestamp>/` directory.
- **Migration**: See [MIGRATION.md](./MIGRATION.md) for detailed upgrade instructions.

### Phase 1: Mandatory Grill-Me Interview
- **What changed**: Phase 1 now REQUIRES an interactive grill-me interview before any agent work starts
- **What to do**: When you run `/sdlc-plan "feature"`, Product Manager will ask 32 questions across 4 phases (problem, users, constraints, success). Answer honestly and specifically.
- **Why**: User input (grill-me) is the single source of truth for all Phase 1 artifacts (requirements, architecture, threat model)
- **Timeline**: Typically 15-45 minutes depending on feature complexity
- **Cannot skip**: Grill-me is mandatory. Product Manager will not mark grill-complete until all 4 phases are resolved with your confirmation.

### Upstream from v1.2.x?
1. Update plugin: `sudo npm install -g sdlc-ai-workflow@latest`
2. Read [MIGRATION.md](./MIGRATION.md) for step-by-step upgrade guide
3. Remove any scripts/CI using `npm run ui` or `npm run init-dashboard`
4. Try Phase 1: `/sdlc-plan "your feature"` and answer the grill-me questions

---

### Option B: Install from Source

```bash
git clone https://github.com/saitarrun/sdlc-ai-workflow
cd sdlc-ai-workflow
npm install
npm run install-local
```

Restart Claude Code.

**See [INSTALLATION.md](INSTALLATION.md) for:**
- Detailed setup for both methods
- Update procedures
- Troubleshooting
- Development symlink mode
- Uninstall instructions

---

## Why SDLC Workflow?

### The Problem
Traditional development workflows require manual handoffs between specialists (architects → engineers → testers → ops). Each transition loses context, creates delays, and introduces errors.

### The Solution
**SDLC Workflow automates the entire software development lifecycle** with AI agents that:
- ✅ Work in parallel across 6 phases (planning, design, development, testing, deployment, operations)
- ✅ Automatically manage dependencies — testing waits for development to complete
- ✅ Apply industry best practices (INVEST, Testing Pyramid, ADR, threat modeling, OWASP)
- ✅ Produce artifacts at every phase (PRD, wireframes, code, tests, security audit, SLOs)

### Use Cases

**Rapid Prototyping** — From idea to tested, deployed prototype in hours
```bash
/sdlc "build a user authentication system" --parallel
```

**Consistent Quality** — Every project follows industry standards without manual oversight
- Testing Pyramid applied automatically
- Security audits included by default
- Architecture decisions documented (ADR)

**Team Scaling** — Reduce onboarding time by automating knowledge transfer
- Architectural decisions made by software-architect agent
- Code style enforced by frontend/backend engineers
- Security best practices integrated into all phases

**Continuous Improvement** — Track metrics across all SDLC phases
- Execution time per phase
- Quality gates passed
- Security vulnerabilities detected and fixed

---

## Features

### 26 Specialized Agents + Auto-Skill Loading (Phase 1 & 2 Complete)

**All agents auto-load phase-specific skills** — agents automatically apply relevant methodologies to produce industry-standard outputs. 

**New agents in Phase 1 & 2**:
- Engineering Manager (team health, retrospectives, QUANTS)
- Tech Lead (architecture, RFC/ADR, mentoring)
- Release Manager (versioning, canary rollout, release notes)
- Technical Writer (API docs, SDKs, guides)
- Performance Engineer (profiling, benchmarking, optimization)
- Accessibility Engineer (WCAG 2.1 AA, screen readers, a11y)

**Phase 1 — Planning, Strategy & Requirements**
- Product Manager (roadmap, milestones) → skill-requirements, skill-prd-synthesis
- Business Analyst (user stories, acceptance criteria) → skill-requirements, skill-plan-breakdown, skill-issue-triage
- Software Architect (tech stack, ADR, system blueprint) → skill-architecture, skill-threat-modeling
- Security Architect (threat modeling, STRIDE) → skill-threat-modeling, skill-security-audit

**Phase 2 — Design & Prototyping**
- UX Researcher (user journeys, personas)
- UI/UX Designer (wireframes, design system)

**Phase 3 — Development & Coding**
- Frontend Engineer (UI, client-side)
- Backend Engineer (servers, APIs, business logic)
- Fullstack Engineer (end-to-end features)
- Database Engineer (schema, migrations, indexing)
- Mobile Developer (iOS/Android)

**Phase 4 — Testing & Security Auditing**
- QA Manual Tester (exploratory testing, user-perspective bugs)
- Automation QA Engineer (test suite generation, CI-wired execution)
- AppSec Engineer (SAST, CVE scanning, OWASP Top 10)
- Penetration Tester (attack simulation, injection testing, auth bypass)

**Phase 5 — Infrastructure & Deployment**
- DevOps Engineer (CI/CD, Dockerfile, presubmit gates)
- Cloud Engineer (IaC, VPC, IAM, storage)

**Phase 6 — Production, Maintenance & Monitoring**
- SRE Engineer (SLO/SLI definition, on-call runbooks)
- SecOps/SOC Analyst (security monitoring, incident response)
- Data Engineer (data pipelines, ETL/ELT, analytics)

### 9 Commands + Parallel Mode

| Command | Phase | Purpose |
|---------|-------|---------|
| `/sdlc` | All | Master orchestrator with 6-phase gates and shared state |
| `/sdlc --parallel` | All | Run all phases with agents working in parallel |
| `/sdlc-parallel` | Any | Run phase with agents collaborating in parallel |
| `/sdlc-plan` | 1 | Requirements gathering → PRD + stories + threat model |
| `/sdlc-design` | 2 | UX research → wireframes + component spec |
| `/sdlc-dev` | 3 | Full-stack implementation per architecture |
| `/sdlc-test` | 4 | Test suite + security audits (AppSec + pen test) |
| `/sdlc-deploy` | 5 | CI/CD pipeline + cloud IaC |
| `/sdlc-ops` | 6 | SLOs + security monitoring + data pipelines |
| `/sdlc-review` | Any | Industry-standard PR review with gh pr comments |

### 43 Knowledge Skills

Skills inject methodology into agents (no tools/model — pure knowledge context). Organized by phase + utilities:

**Phase 1 — Planning & Requirements**
- `skill-requirements` — INVEST criteria, QUANTS framework
- `skill-prd-synthesis` — Convert conversation context into PRD
- `skill-plan-breakdown` — Break plan into vertical-slice issues
- `skill-issue-triage` — Triage workflow for bugs/features

**Phase 2 — Design & Prototyping**
- `skill-ux-design` — User journeys, personas, wireframing
- `skill-prototype` — Throwaway code to validate design assumptions

**Phase 3 — Development & Coding**
- `skill-code-standards` — Clean Code, SOLID, DRY, naming
- `skill-architecture` — ADR format, coupling/cohesion, fitness functions
- `skill-architecture-refactor` — Find deepening opportunities, improve testability
- `skill-zoom-out` — Understand code at higher abstraction level

**Phase 4 — Testing & Security Auditing**
- `skill-code-quality` — Linting, testing pyramid, SAST/SCA, security standards, CI/CD gates
- `skill-code-review` — Code review taxonomy, peer review culture
- `skill-pr-review` — Multi-agent parallel PR review, CLAUDE.md compliance, git history, confidence scoring
- `skill-testing` — Testing Pyramid, F.I.R.S.T., test doubles
- `skill-tdd` — Test-driven development: red-green-refactor loop
- `skill-playwright` — Browser automation, E2E testing, visual regression, cross-browser validation
- `skill-diagnose` — Disciplined bug diagnosis, reproduce → hypothesise → instrument → fix
- `skill-threat-modeling` — STRIDE, PASTA, attack surface mapping
- `skill-security-audit` — OWASP Top 10, CWE taint analysis

**Phase 5 — Infrastructure & Deployment**
- `skill-cicd` — Hermetic builds, presubmit gates, trunk-based dev
- `skill-precommit-hooks` — Pre-commit enforcement for quality gates
- `skill-cloud-infra` — Terraform, IaC patterns, cloud services

**Phase 6 — Operations & Maintenance**
- `skill-ops-sre` — SLO/SLI, QUANTS, error budgets, toil measurement
- `skill-documentation` — Audience-first writing, docs-as-code

**Utilities & Meta**
- `skill-caveman` — Ultra-compressed communication, 75% token reduction
- `skill-grill-me` — Relentless design review, decision tree interrogation
- `skill-handoff` — Compact session for agent handoff
- `skill-teach` — Teach skill/concept over multiple sessions
- `skill-write-skill` — Create new agent skills
- `skill-git-safety` — Git destructive operation guards

## Quick Start (3 Commands to Remember)

```bash
# Build a feature end-to-end
/sdlc "your feature description"

# Build faster with parallel agents (2-3x speedup)
/sdlc "your feature description" --parallel

# Review a PR with code-review-graph analysis
/sdlc-review --pr 1 --with-graph
```

**Need to remember commands?** Run the interactive menu:
```bash
npm run menu
# OR
sdlc
```

**Full command reference**: See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

---

## Usage

### Master Orchestrator

Run the full 6-phase SDLC pipeline end-to-end:

```
/sdlc "build a user authentication system"
```

The command will:
1. Parse the feature request
2. Initialize `.sdlc/run-<timestamp>/` for shared state
3. Spawn agents sequentially through all 6 phases with explicit user approval gates between phases
4. Produce comprehensive artifacts (PRD, ADR, threat model, wireframes, code, tests, security audit, SLOs, runbooks)
5. Offer to create a GitHub PR with all changes

### Orchestrator — Real-Time Agent Coordination

The orchestrator manages agent dependencies, maintains an execution queue, and broadcasts real-time status updates:

```bash
npm run orchestrator -- --dir /path/to/project --port 4242 --run-id <optional-run-id>
```

**Features:**
- **Dependency Graph**: Automatically determines which agents can run based on completions
- **Queue Management**: Maintains a queue of ready-to-spawn agents
- **Real-Time Updates**: Broadcasts agent status changes via Server-Sent Events
- **Persistent State**: Stores all agent status in `.sdlc/run-<timestamp>/collaboration-log.json`
- **Multi-Run Support**: Tracks multiple concurrent or historical runs

**API Endpoints:**
- `GET /api/runs` — List all runs
- `GET /api/runs/:id` — Get specific run details with agent statuses
- `POST /api/agent/spawn/:agent` — Mark agent as working
- `POST /api/agent/complete/:agent` — Mark agent as complete
- `POST /api/agent/block/:agent` — Mark agent as blocked
- `GET /events` — Server-Sent Events stream for real-time updates

### Individual Phase Commands

For faster iteration, run individual phases:

```bash
/sdlc-plan "add OAuth login"                    # Phase 1 only
/sdlc-design                                     # Phase 2 only
/sdlc-dev --stack backend,frontend               # Phase 3 (backend + frontend)
/sdlc-test --layer all --run                     # Phase 4 (full test + security)
/sdlc-deploy --trigger                           # Phase 5 (CI/CD + cloud)
/sdlc-ops --framework prometheus                 # Phase 6 (SRE + monitoring)
```

### Code Review

Perform industry-standard review on any PR:

```bash
/sdlc-review --pr 1                              # Review PR #1 with 3 parallel agents
```

The command posts inline comments via `gh pr comment`, confidence-filtered to show only high-confidence issues.

#### With code-review-graph Integration

Enhanced review with visual dependency analysis:

```bash
/sdlc-review --pr 1 --with-graph                   # Review PR #1 with dependency visualization
```

This includes:
- Coupling and cohesion analysis
- Change impact on system architecture
- Dependency graph visualization
- Refactoring safety assessment

See [INTEGRATIONS.md](./INTEGRATIONS.md) for full details on code-review-graph capabilities.

## Multi-Agent Parallel Collaboration (NEW in v1.0.0)

All 20 agents work **in parallel** with **real-time communication** and **shared context**:

- **Parallel Execution**: Multiple agents work simultaneously on independent tasks
- **Shared Workspace**: `.sdlc/run-<timestamp>/` with `context.json` for shared state
- **Collaboration Log**: Real-time messages between agents (`collaboration-log.json`)
- **Dependency Management**: Agents automatically wait for blocking dependencies
- **Feedback Loops**: Peer review and validation run in parallel with development
- **Speedup**: 2-3x faster than sequential execution

### Example: Phase 3 Development (Parallel vs Sequential)

**Sequential (Old Way)**:
```
SoftwareArchitect ──► FrontendEngineer ──► BackendEngineer ──► DatabaseEngineer
    12m                   12m                   12m                 12m
                                                                   = 48 minutes total
```

**Parallel (New Way)**:
```
SoftwareArchitect (12m)
        │
    (publishes architecture)
        │
    ┌───┴────┬──────────┐
    ▼        ▼          ▼
   FE (12m) BE (12m)  DB (12m)  ◄── All run in parallel
    └────┬────┘
         ▼
   Integration (3m)
                                = 25 minutes total (2x speedup)
```

### Usage

```bash
# Run all phases with parallel agents
/sdlc "build a user auth system" --parallel

# Run specific phase with parallelization
/sdlc-parallel phase-3 --max-workers=4 --feedback-loops

# Show real-time collaboration log
/sdlc --show-collaboration-log --verbose
```

See [AGENT_COLLABORATION.md](./AGENT_COLLABORATION.md) for full documentation.

---

## Code Quality Standards (v1.0.0)

The plugin now enforces comprehensive code quality standards across 5 dimensions:

1. **Static Code Quality** — Linting, formatting, naming conventions, complexity control, DRY
2. **Testing & Coverage** — Unit/integration/E2E tests, 80%+ coverage threshold, F.I.R.S.T. principles
3. **Architecture** — SOLID principles, documentation, technical debt tracking, dependency hygiene
4. **Security (DevSecOps)** — SAST scanning, SCA audits, secret detection, input validation
5. **Review & CI/CD** — Peer reviews, automated quality gates, blocking on failures

### Ready-to-Use Configuration Templates

All agents come with working configurations:
- **ESLint** (.eslintrc.js) — Linting rules for naming, complexity, security
- **Jest** (jest.config.js) — Testing pyramid 70/20/10, coverage thresholds
- **Pre-commit hooks** (.husky/pre-commit) — Enforce standards before commit
- **GitHub Actions** (ci.yml) — Full CI/CD pipeline with quality gates
- **NPM scripts** (package.json) — Commands for all quality checks

See [skill-code-quality](./skills/skill-code-quality/) for complete documentation and implementation examples.

---

## Book Principles in Action

### Clean Code Principles

All development agents enforce:
- Meaningful names (no `d`, `info`, `data`)
- Small functions (≤20 lines)
- One level of abstraction per function
- Self-documenting code reduces comment burden

### Software Engineering Best Practices

- **Code Review** — Blocking issues vs. nits; 24-hour SLA
- **Testing Pyramid** — Unit (cheap) ≫ Integration ≫ E2E (expensive)
- **Beyoncé Rule** — "If you care about it, test it"
- **Hermetic builds** — No network calls, reproducible artifacts, artifact-based caching
- **Trunk-based development** — Short-lived branches, feature flags preferred, no broken trunk
- **QUANTS framework** — Measure productivity via Quality, Attention, Toil, Time, Satisfaction

### Architecture: The Hard Parts

- **ADR (Architecture Decision Record)** — Context, Decision, Consequences + explicit trade-off table
- **Coupling spectrum** — Service granularity decisions justified by coupling analysis
- **Fitness functions** — Automated architecture compliance checks
- **One-Version Rule** — Minimize external dependency versions

### Pragmatic Programmer

- **DRY (Don't Repeat Yourself)** — Applied to code, schema, IaC, documentation
- **ETC (Easy To Change)** — Every design choice evaluated for changeability
- **Tracer bullets** — Build minimal end-to-end feature first, then iterate
- **No broken windows** — Fix technical debt immediately, don't let it accumulate
- **Code generation** — Generate repetitive code patterns, not written by hand

## Extending the Plugin

### Adding a New Agent

1. Create `agents/new-agent-name.md` with frontmatter:
   ```yaml
   ---
   name: new-agent-name
   description: When to invoke this agent...
   tools: Read, Bash, Write, etc.
   model: haiku|sonnet|opus
   color: optional-hex-or-name
   ---
   ```

2. Write the system prompt in the body with book principles embedded

3. Update `skills/` to reference relevant methodologies if needed

4. Integrate into a command or the master `/sdlc` orchestrator

### Adding a New Skill

1. Create `skills/skill-name/SKILL.md` with frontmatter:
   ```yaml
   ---
   name: skill-name
   description: This skill should be used when the user asks to "..."
   version: 1.0.0
   ---
   ```

2. Write methodology content that agents will load automatically

3. Add optional reference files in `skills/skill-name/references/`

## Development

### Validate Plugin Structure

```bash
make validate
```

### Remove Plugin

```bash
make uninstall
```

## Verification

Test the plugin with sample features:

1. **Phase 1 — Planning:** `/sdlc-plan "add user profile page"`
   - ✓ PRD generated
   - ✓ User stories + AC written
   - ✓ Threat model (STRIDE) produced
   - ✓ GitHub issues created

2. **Phase 2 — Design:** `/sdlc-design`
   - ✓ User journey maps written
   - ✓ ASCII wireframes produced

3. **Phase 3 — Development:** `/sdlc-dev --stack backend,frontend`
   - ✓ Backend code generated (APIs, business logic)
   - ✓ Frontend code generated (UI, client logic)

4. **Phase 4 — Testing:** `/sdlc-test --layer all --run`
   - ✓ Unit tests generated (70%)
   - ✓ Integration tests (20%)
   - ✓ E2E tests (10%)
   - ✓ OWASP/CWE audit performed
   - ✓ Pen test findings documented

5. **Phase 5 — Deployment:** `/sdlc-deploy --trigger`
   - ✓ GitHub Actions pipeline created
   - ✓ Dockerfile generated
   - ✓ Terraform IaC written
   - ✓ Pipeline runs green

6. **Phase 6 — Operations:** `/sdlc-ops --framework prometheus`
   - ✓ SLOs defined
   - ✓ Alerting rules written
   - ✓ Runbook stub created
   - ✓ QUANTS summary produced

7. **End-to-end:** `/sdlc "build a user authentication system"`
   - ✓ All 6 phases run sequentially with approval gates
   - ✓ Comprehensive artifacts produced
   - ✓ PR offered with auto-generated summary

## License

MIT (or as specified by the user)

## Core Files (Essentials Only)

- **README.md** ← Features, installation, usage
- **CLAUDE.md** ← Agent/skill conventions, how to extend
- **QUICK_REFERENCE.md** ← Commands, copy-paste examples

## Extended Documentation

Reference docs archived in `docs/`:
- `docs/INTEGRATION.md` — code-review-graph integration
- `docs/AGENT_DEVELOPMENT_GUIDE.md` — Agent anatomy
- `docs/AGENT_COLLABORATION.md` — Parallel execution details
- `docs/AGENT_SKILLS_MANIFEST.md` — Skill mapping reference

## Contributing

To extend this plugin with new agents, skills, or commands, follow the patterns documented in [CLAUDE.md](./CLAUDE.md).
