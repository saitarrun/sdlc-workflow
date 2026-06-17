# Changelog

All notable changes to this project will be documented in this file.

## [1.3.0] - 2026-06-17

### ⚠️ BREAKING CHANGES

#### Dashboard Removed
- Removed: `npm run ui` - Web-based dashboard for agent monitoring
- Removed: `npm run init-dashboard` - Dashboard initialization script
- Removed: Dashboard UI server (`scripts/ui-server.js`)
- **Migration**: Use Claude Code terminal output instead. Agents report progress via console logs and artifacts.
- **Impact**: Any scripts or CI/CD pipelines that invoke `npm run ui` or `npm run init-dashboard` must be updated.

#### Phase 1 Workflow Changed - Mandatory Grill-Me Interview
- **BREAKING**: Phase 1 now REQUIRES mandatory grill-me interview before any agent work
- **BREAKING**: Product Manager cannot proceed without completing all 4 grill-me phases (blocking gate)
- **BREAKING**: All downstream agents (Business Analyst, Software Architect, Security Architect) MUST read `.sdlc/01-grill-summary.md` as first step
- **Impact**: Automated Phase 1 workflows that don't conduct grill-me interview will fail
- **Migration**: See MIGRATION.md for upgrade instructions

### ✨ Features

#### Phase 1: User-First Data Flow
- Mandatory grill-me skill with 4-phase interview (problem, users, constraints, success)
- Grill-summary.md created as single source of truth for all Phase 1 agents
- All downstream agents ground work in customer input, not assumptions
- Product Manager applies: skill-grill-me, skill-requirements, skill-prd-synthesis
- Business Analyst applies: skill-requirements, skill-plan-breakdown, skill-issue-triage
- Software Architect applies: skill-architecture, skill-threat-modeling, skill-zoom-out
- Security Architect applies: skill-threat-modeling, skill-security-audit

#### Enhanced Business Analyst
- Step 0: MANDATORY read grill-summary.md first
- Every user story must reference:
  - Persona from grill-summary
  - Pain point addressed (direct quote from grill-summary)
  - Success metric impact
- Stories grounded in customer input, not assumptions
- Applies INVEST criteria to grill-me validated requirements

#### Enhanced Software Architect
- Step 0: MANDATORY read grill-summary.md first
- Tech stack decisions CONSTRAINED by grill-me (not by "best practices")
- Respects customer constraints: timeline, team size, compliance requirements
- Examples:
  - "2 weeks + 2 engineers" → monolith (not microservices)
  - "Unknown tech stack" → proven patterns (not experiments)
  - "GDPR compliance" → tech with privacy-first design
- Produces ADR grounded in grill-me context

#### Enhanced Security Architect
- Step 0: MANDATORY read grill-summary.md first
- Threat model SCOPED to customer's actual concerns from grill-summary
- Threats prioritized by customer mentions:
  - Customer mentioned "account hijacking" → prioritize Spoofing threats
  - Customer mentioned "GDPR compliance" → prioritize Information Disclosure
  - Customer didn't mention regulatory needs → don't over-engineer compliance controls
- Every control evaluated: "Can we ship this in the customer's timeline?"

### 🗑️ Removed

- `scripts/ui-server.js` - Dashboard Express server
- `scripts/init-dashboard.js` - Dashboard initialization
- `scripts/ui/` - Dashboard UI directory (HTML, CSS, JS)
- `docs/DASHBOARD.md` - Dashboard architecture guide
- `docs/AGENT_DASHBOARD_INTEGRATION.md` - Agent-dashboard integration guide
- `docs/DASHBOARD_SYNCHRONIZATION.md` - Dashboard sync documentation
- `docs/AGENT_REPORTER_GUIDE.md` - Agent reporter integration guide
- `docs/screenshots/dashboard-overview.png` - Dashboard screenshot
- npm scripts: `ui`, `init-dashboard`

### 📝 Changed

- `README.md` - Removed dashboard references, added Phase 1 grill-me documentation
- `EXECUTION_GUIDE.md` - Removed all dashboard monitoring sections
- `commands/sdlc-plan.md` - Added data flow diagram showing grill-me → all agents
- `commands/sdlc.md` - Removed "Dashboard-Synced" phase section
- `agents/product-manager.md` - Enhanced with mandatory grill-me blocking gate
- `agents/business-analyst.md` - Enhanced with mandatory grill-summary read-first
- `agents/software-architect.md` - Enhanced with grill-me constraint-driven decisions
- `agents/security-architect.md` - Enhanced with grill-me scoped threat modeling
- `package.json` - Version bump to 1.3.0, removed ui scripts

### 📊 Stats

- Files changed: 18
- Insertions: 231
- Deletions: 2,319
- Agents enhanced: 4 (product-manager, business-analyst, software-architect, security-architect)
- Skills auto-wired: 9 (skill-grill-me, skill-requirements, skill-prd-synthesis, skill-plan-breakdown, skill-issue-triage, skill-architecture, skill-threat-modeling, skill-zoom-out, skill-security-audit)

### 🔄 Migration Guide

See **MIGRATION.md** for detailed upgrade instructions from v1.2.x to v1.3.0.

**Key points:**
1. Dashboard functionality completely removed - use Claude Code terminal output instead
2. Phase 1 now requires interactive grill-me interview
3. All Phase 1 agents read grill-summary.md as first step
4. User input from grill-me becomes single source of truth

---

## [1.2.3] - 2026-06-16

### Features
- 26 specialized agents across 6 SDLC phases
- 43 knowledge skills with auto-wiring
- 14 commands for phase orchestration
- Real-time dashboard monitoring
- Parallel agent execution with dependency management
- Industry-standard best practices (QUANTS, INVEST, Testing Pyramid, OWASP)

### Known Issues
- Dashboard removed in v1.3.0 (use terminal output instead)

---

## [1.2.2] - 2026-06-16

### Features
- Dashboard integration with real-time agent monitoring
- Agent reporter CLI for status updates
- Multi-phase orchestration with dependency management

---

## [1.2.1] - 2026-06-16

### Initial Release
- 26 agents, 43 skills, 14 commands
- 6 SDLC phases with sequential execution
- Basic orchestration framework
