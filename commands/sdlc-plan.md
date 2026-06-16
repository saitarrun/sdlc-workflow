---
description: Phase 1 planning — grill-me interview + 4 sequential agents
argument-hint: <feature-description>
tools: Bash
model: sonnet
---

# /sdlc-plan Command Implementation

This command implements Phase 1 planning with an interactive grill-me interview followed by 4 sequential agent executions.

## Instructions for Claude

When invoked with a feature description, follow this exact process:

### STEP 1: Grill-Me Interview (Ask 32 Questions)

Ask the user questions ONE AT A TIME across these 8 sections:

**1. Problem & Pain Points (4 questions)**
- What is the core problem you're solving?
- Who experiences this problem?
- Why is this important NOW?
- What's the business impact if unsolved?

**2. Users & Personas (4 questions)**
- Who are your primary users (2-3 personas)?
- What are their specific pain points?
- What's their current workaround?
- How would they measure success?

**3. Scope & Constraints (5 questions)**
- What's your timeline/deadline?
- How many engineers can work on this?
- What's your budget/resource constraints?
- What's off-limits (what won't you do)?
- What dependencies exist (other teams, infrastructure)?

**4. Technical Landscape (4 questions)**
- What's your existing tech stack?
- What can you reuse vs. build new?
- What are hard constraints (compliance, security, legacy)?
- Are there preferred technologies?

**5. Performance & Scale (3 questions)**
- How many users/requests per second?
- What latency targets do you have?
- What's the growth trajectory (1y, 5y)?

**6. Security & Compliance (4 questions)**
- What data will you handle (PII, payment, health)?
- What compliance requirements apply (GDPR, SOC2, PCI)?
- What security threats matter most?
- Are there industry-specific standards?

**7. Success Metrics - QUANTS (5 questions)**
- Quality: How do you measure quality? (bugs, uptime, coverage)
- Attention: How will success be measured? (DAU, adoption, usage)
- Toil: How much manual work does this eliminate?
- Time: What time-based metrics matter? (faster deploy, quicker response)
- Satisfaction: How happy should users/team be? (NPS, CSAT)

**8. Dependencies & Risks (3 questions)**
- What needs to happen BEFORE you can start?
- What are the biggest unknown risks?
- What are your key assumptions?

**After all questions:** Summarize understanding and ask "Is this accurate and complete?" If not, clarify what's missing.

### STEP 2: Save Grill Summary

Create `.sdlc/01-grill-summary.md` with:
- Feature description
- All 32 answers organized by section
- Timestamp and confirmation

### STEP 3: Spawn Phase 1 Agents (Sequential)

Using the Agent() tool, spawn these agents IN ORDER with full grill context:

**Agent 1: product-manager**
```
Role: Define product vision, roadmap, and success metrics
Input: Complete grill-me answers
Output: 01-roadmap.md (product vision, QUANTS targets, roadmap, milestones)
```

Wait for product-manager to complete, then:

**Agent 2: business-analyst**
```
Role: Decompose into INVEST-compliant user stories with acceptance criteria
Input: Grill answers + product-manager roadmap
Output: 01-requirements.md (user stories, acceptance criteria, data flows)
```

Wait for business-analyst to complete, then:

**Agent 3: software-architect**
```
Role: Select tech stack and produce Architecture Decision Record
Input: Grill answers + product roadmap + requirements
Output: 01-architecture.md (tech stack, ADR, component design)
```

Wait for software-architect to complete, then:

**Agent 4: security-architect**
```
Role: STRIDE threat modeling and security controls
Input: Grill answers + architecture
Output: 01-threat-model.md (STRIDE analysis, security controls)
```

### STEP 4: Display Completion

Show:
- ✅ Phase 1 Complete
- Run ID and artifact location
- Dashboard URL: http://127.0.0.1:4242
- Summary of generated files

---

**Mandatory**: All 32 grill-me questions must be asked. Follow the sections strictly.  
**Mandatory**: Each agent must complete before the next spawns.  
**Mandatory**: All artifacts must be generated and saved.
