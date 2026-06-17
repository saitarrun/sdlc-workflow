# Migration Guide: v1.2.x → v1.3.0

This guide helps you upgrade from v1.2.3 to v1.3.0 with major changes to Phase 1 workflow and dashboard removal.

## Overview of Changes

### What's New in v1.3.0
✨ **Mandatory Grill-Me Interview** - Phase 1 now requires interactive customer interview
✨ **User-First Data Flow** - All agents ground work in grill-me answers (source of truth)
✨ **Dashboard Removed** - Cleaner, simpler monitoring via terminal output

### What's Breaking
⚠️ **Dashboard Functionality Removed** - `npm run ui` and `npm run init-dashboard` no longer work
⚠️ **Phase 1 Workflow Changed** - Must conduct grill-me interview before proceeding
⚠️ **Mandatory Interview** - All 4 phases of grill-me must be completed

---

## Step 1: Update the Plugin

### Option A: Global NPM Installation (Recommended)

```bash
# Update to latest version
sudo npm install -g sdlc-ai-workflow@latest

# Reinstall plugin for Claude Code
sdlc-ai-workflow install

# Restart Claude Code
```

### Option B: Update from Source

```bash
cd /path/to/sdlc-ai-workflow
git pull origin main
npm install
npm run install-local

# Restart Claude Code
```

---

## Step 2: Remove Dashboard Dependencies

### Stop Using These Commands
If you have scripts, CI/CD, or documentation referencing these commands, **REMOVE THEM**:

❌ `npm run ui` - Dashboard server (REMOVED)
❌ `npm run init-dashboard` - Dashboard init (REMOVED)
❌ `open http://localhost:4242` - Dashboard URL (REMOVED)

### Update CI/CD Pipelines

If you have GitHub Actions or deployment scripts using dashboard:

**Before (v1.2.x):**
```bash
# Terminal 1: Start dashboard
npm run orchestrator
npm run init-dashboard
open http://localhost:4242

# Terminal 2: Run phases
/sdlc-plan "feature"
```

**After (v1.3.0):**
```bash
# Just run phases - progress shown in terminal
/sdlc-plan "feature"
```

### Remove from Documentation

Search your docs for:
- ❌ "Open dashboard at http://127.0.0.1:4242"
- ❌ "Monitor agents in real-time dashboard"
- ❌ "Agent status shown in dashboard"

Replace with:
- ✅ "Monitor progress in Claude Code terminal"
- ✅ "Agent status shown in console output"
- ✅ "Artifacts generated in .sdlc/run-<id>/"

---

## Step 3: Understand New Phase 1 Flow

### Old Phase 1 Flow (v1.2.x)

```
Feature Description
    ↓
Product Manager (with assumptions)
Business Analyst
Software Architect
Security Architect
    ↓
Artifacts (based on assumptions)
```

### New Phase 1 Flow (v1.3.0) - USER-FIRST

```
Feature Description
    ↓
Product Manager
    ├─ MANDATORY: Conduct Grill-Me Interview (4 phases)
    │  ├─ Phase 1: Problem Understanding
    │  ├─ Phase 2: User & Market Understanding
    │  ├─ Phase 3: Constraints & Trade-offs
    │  └─ Phase 4: Success Criteria
    └─ Output: .sdlc/01-grill-summary.md (SOURCE OF TRUTH)
    ↓
Business Analyst
    ├─ MANDATORY: Read .sdlc/01-grill-summary.md FIRST
    └─ Write requirements grounded in grill-me answers
    ↓
Software Architect
    ├─ MANDATORY: Read .sdlc/01-grill-summary.md FIRST
    └─ Design tech stack constrained by grill-me (timeline, team, compliance)
    ↓
Security Architect
    ├─ MANDATORY: Read .sdlc/01-grill-summary.md FIRST
    └─ Scope threat model to customer's concerns from grill-me
    ↓
Artifacts (all grounded in grill-me user input)
```

---

## Step 4: Update Your Workflow

### Running Phase 1 in v1.3.0

```bash
/sdlc-plan "add OAuth login to SaaS"
```

**What happens:**
1. Product Manager asks you 32 questions across 4 phases
   - Problem: "What problem are you solving?" "Why now?"
   - Users: "Who are the primary users?" "What are their pain points?"
   - Constraints: "What's your timeline?" "Team size?" "Budget?"
   - Success: "How will you measure success?" "What are failure modes?"

2. After interview, Product Manager creates `.sdlc/01-grill-summary.md`

3. Business Analyst reads grill-summary → writes requirements grounded in your answers

4. Software Architect reads grill-summary → selects tech stack based on your constraints
   - Example: "2 weeks + 2 engineers" → monolith, not microservices
   - Example: "GDPR compliance required" → tech with privacy support

5. Security Architect reads grill-summary → scopes threat model to your concerns
   - Example: "Account hijacking is a risk" → prioritize auth security
   - Example: "No regulatory requirements" → focus on realistic threats

**All artifacts reference back to your grill-me answers.**

---

## Step 5: Monitor Progress

### Old Monitoring (v1.2.x)
- ✅ Real-time dashboard at http://localhost:4242
- ✅ Live agent status updates
- ✅ Metrics and progress bars

### New Monitoring (v1.3.0)
- ✅ Claude Code terminal output
- ✅ Agent progress in console logs
- ✅ Artifacts generated in `.sdlc/run-<timestamp>/`
- ✅ Collaboration log: `.sdlc/run-<timestamp>/collaboration-log.json`

**To check progress:**
```bash
# See generated artifacts
ls .sdlc/run-<timestamp>/

# View grill-summary
cat .sdlc/run-<timestamp>/01-grill-summary.md

# View agent collaboration log
cat .sdlc/run-<timestamp>/collaboration-log.json
```

---

## Step 6: Understand Grill-Me Interview

### The 4 Mandatory Phases

#### Phase 1: Problem Understanding (MUST RESOLVE)
```
Q: What problem are you REALLY solving? (not the feature request, the underlying problem)
Q: Why does this matter NOW? (what's the business/user urgency?)
Q: Have you solved this before? (if yes, why is it different this time?)
Q: What have you tried already? (what failed and why?)

Output: Problem statement + Why it matters + What's been tried
```

#### Phase 2: User & Market Understanding (MUST RESOLVE)
```
Q: Who are the PRIMARY users? (get specific personas, not "everyone")
Q: What are their pain points? (get at least 3 specific, measurable problems)
Q: How do they currently solve this? (understand the status quo)
Q: Why won't they use a competitor's solution? (what's unique/necessary?)

Output: 2-3 personas + pain points + current workarounds + competitive advantage
```

#### Phase 3: Constraints & Trade-offs (MUST RESOLVE)
```
Q: Timeline: When does this need to ship? Why that date?
Q: Budget: What's the engineering effort? Team size? Timeline × team?
Q: Technical constraints: What systems must integrate? Dependencies?
Q: Organizational constraints: Who has to approve? Stakeholders?

Output: Timeline + Budget + Tech constraints + Organizational constraints
```

#### Phase 4: Success Criteria (MUST RESOLVE)
```
Q: How will you measure success? (not "users like it" — concrete metrics)
Q: What's the minimum viable success? (if you hit this, you're happy?)
Q: What metrics matter in 3 months? 6 months? 1 year?
Q: What would be a failure? (explicit failure modes)

Output: QUANTS metrics (Quality, Attention, Toil, Time, Satisfaction)
```

**Product Manager CANNOT proceed until all 4 phases are resolved with your confirmation.**

---

## Step 7: Update Automation

### Automated Phase 1 Workflows

If you have automated Phase 1 (e.g., from GitHub issue or feature request):

**Before (v1.2.x):**
```bash
/sdlc-plan "feature description"
# → agents start immediately with feature description
```

**After (v1.3.0):**
```bash
/sdlc-plan "feature description"
# → Product Manager asks 32 grill-me questions
# → User must answer all questions
# → Only then do agents proceed
```

**Note:** Grill-me is INTERACTIVE and requires user input. You cannot skip it.

If you need automated Phase 1, you must:
1. Manually answer grill-me interview questions
2. OR prepare answers to all 32 questions in advance
3. Agent will ask questions one-at-a-time and wait for your input

---

## Step 8: Troubleshooting

### "Product Manager is asking questions - what do I do?"

**This is normal in v1.3.0!** Answer the questions honestly and specifically:
- ❌ Don't say "ASAP" - say "June 30, 2026"
- ❌ Don't say "fast" - say "< 100ms p95 latency"
- ❌ Don't say "everyone" - name 2-3 specific personas
- ✅ Be specific, measurable, time-bound

### "Where's the dashboard?"

**Removed in v1.3.0.** Instead:
- Check Claude Code terminal for agent progress
- View artifacts: `ls .sdlc/run-<timestamp>/`
- Read grill-summary: `cat .sdlc/run-<timestamp>/01-grill-summary.md`

### "Can I skip the grill-me interview?"

**No, it's mandatory.** Product Manager will not proceed without:
- Resolving all 4 phases (problem, users, constraints, success)
- Getting explicit customer agreement on each phase
- Creating comprehensive grill-summary.md

This ensures user input is the first priority and all downstream work is grounded in real customer needs.

### "npm run ui doesn't work"

**Correct!** It's been removed. Use Claude Code terminal instead to monitor progress.

---

## Step 9: FAQ

### Q: Do I have to answer all 32 grill-me questions?

**A:** Yes, but they're grouped into 4 phases. Product Manager will ask them one-at-a-time, one phase at a time. You can answer as you go, and Product Manager will drill deeper as needed.

### Q: What if I don't know the answer to a grill-me question?

**A:** Tell the Product Manager. They'll ask follow-ups to help you discover the answer, or suggest a reasonable default and ask if that works.

### Q: Can I run Phase 1 multiple times with different grill-me answers?

**A:** Yes! Each run creates a new directory: `.sdlc/run-<timestamp>/`. You can run Phase 1 multiple times with different questions or answers.

### Q: How long does the grill-me interview take?

**A:** Depends on your feature complexity and how thoroughly you want to explore questions. Typically 15-45 minutes for a medium-complexity feature.

### Q: Are all Phase 1 agents affected?

**A:** Yes:
- Product Manager: Conducts grill-me (mandatory)
- Business Analyst: Reads grill-summary first
- Software Architect: Reads grill-summary first
- Security Architect: Reads grill-summary first

All downstream work depends on grill-me answers.

### Q: What if my team is already using v1.2.3 in production?

**A:** 
1. Update the plugin (safe - local only)
2. New Phase 1 workflows will use mandatory grill-me
3. Old workflows/CI won't break, but they'll stall at grill-me interview (waiting for input)
4. Update your automation to provide grill-me answers programmatically, or run Phase 1 interactively

---

## Step 10: Validate Installation

After updating, verify v1.3.0 is installed:

```bash
npm list -g sdlc-ai-workflow
# Should show: sdlc-ai-workflow@1.3.0

# Check plugin is loaded in Claude Code
/help
# Look for /sdlc-plan, /sdlc-dev, etc.

# Try Phase 1
/sdlc-plan "test feature"
# Should start grill-me interview
```

---

## Need Help?

- **Read**: `README.md` - Feature overview, Phase 1 flow
- **Read**: `CLAUDE.md` - Agent conventions, skill auto-wiring
- **Read**: `QUICK_REFERENCE.md` - Command reference
- **Check**: `docs/AGENT_DEVELOPMENT_GUIDE.md` - Agent anatomy
- **File Issue**: https://github.com/saitarrun/sdlc-ai-workflow/issues

---

**That's it!** You're now ready to use v1.3.0 with mandatory grill-me and user-first Phase 1. 🚀
