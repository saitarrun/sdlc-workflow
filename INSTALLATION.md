# Installation & Updates Guide

## Initial Setup (New Device)

### Option A: Global NPM Install (Recommended for Most Users)

**One-command installation from npm registry:**

```bash
sudo npm install -g @saitarrun/sdlc-workflow
sdlc-workflow install
```

Then **restart Claude Code** and you're ready to use `/sdlc-plan`, `/sdlc-design`, etc.

**To update later:**
```bash
sudo npm install -g @saitarrun/sdlc-workflow@latest
sdlc-workflow install
```

### Option B: Install from Source (For Development)

If you want to develop agents, skills, or commands locally:

#### Step 1: Clone the Repository

```bash
git clone https://github.com/saitarrun/sdlc-workflow.git
cd sdlc-workflow
```

#### Step 2: Install Node Dependencies

```bash
npm install
```

#### Step 3: Install the Plugin to Claude Code

```bash
npm run install-local
```

**Alternative (using Make):**
```bash
make install-local
```

#### Step 4: Verify Installation

```bash
make validate
```

Or manually check:
```bash
ls ~/.claude/plugins/sdlc-workflow
```

#### Step 5: Restart Claude Code

Quit Claude Code completely and reopen it. The plugin commands will now be available:
- `/sdlc-plan` — Phase 1 planning with grill-me interview
- `/sdlc-design` — Phase 2 design
- `/sdlc-dev` — Phase 3 development
- `/sdlc-test` — Phase 4 testing
- `/sdlc-deploy` — Phase 5 deployment
- `/sdlc-ops` — Phase 6 operations

---

## Updating After New Commits

### If You Installed Globally (NPM)

When new commits are pushed to npm, simply:

```bash
sudo npm install -g sdlc-workflow@latest
sdlc-workflow install
```

Then restart Claude Code.

### If You Installed from Source

When new commits are pushed to GitHub, update your local copy:

#### Step 1: Pull Latest Changes

```bash
cd ~/path/to/sdlc-workflow
git pull origin main
```

#### Step 2: Install Updated Dependencies (if any changed)

```bash
npm install
```

#### Step 3: Reinstall the Plugin

```bash
npm run install-local
```

Or:
```bash
make install-local
```

#### Step 4: Validate Updates

```bash
make validate
```

#### Step 5: Restart Claude Code

Quit and reopen Claude Code for changes to take effect.

### Quick Update Script (Source Install Only)

For convenience, create an alias in your shell:

```bash
# Add to ~/.zshrc or ~/.bashrc
alias update-sdlc='cd ~/path/to/sdlc-workflow && git pull origin main && npm install && npm run install-local && make validate'
```

Then simply run:
```bash
update-sdlc
```

---

## What Gets Installed

The `npm run install-local` command:
1. Copies the plugin to `~/.claude/plugins/sdlc-workflow/`
2. Registers the plugin with Claude Code
3. Makes all `/sdlc-*` commands available
4. Wires up agents and skills for execution

---

## Uninstall

### If You Installed Globally

```bash
sudo npm uninstall -g @saitarrun/sdlc-workflow
```

This removes the global CLI and plugin files.

### If You Installed from Source

```bash
cd ~/path/to/sdlc-workflow
npm run uninstall-local
```

Or:
```bash
make uninstall
```

This removes the plugin from `~/.claude/plugins/` but keeps your local repository files.

---

## Troubleshooting

### Plugin not showing up after install

1. **Clear Claude Code cache:**
   ```bash
   rm -rf ~/.claude/cache
   ```

2. **Verify installation:**
   ```bash
   ls ~/.claude/plugins/sdlc-workflow/
   ```

3. **Check validation:**
   ```bash
   make validate
   ```

4. **Restart Claude Code** completely (not just reload)

### Commands not available

- Check that `make validate` passes with no errors
- Verify agent frontmatter has: `name`, `description`, `tools`, `model`
- Check skill frontmatter has: `name`, `description`, `version`
- Run `npm run install-local` again
- Restart Claude Code

### "Plugin not found" error

Run:
```bash
npm run install-local
make validate
```

Then restart Claude Code.

---

## Development Install (Symlink Mode)

For active development, symlink instead of copying:

```bash
npm run install-local -- --symlink
```

This way, changes to agents and skills are immediately available without reinstalling.

---

## Version Tracking

To see which version you have installed:

```bash
cat package.json | grep '"version"'
```

To see the latest version on GitHub:

```bash
git log -1 --pretty=format:"%H %s"
```

---

**Status**: Ready for single-device and multi-device deployments  
**Update Frequency**: Run `git pull && npm run install-local` whenever changes are pushed to GitHub
