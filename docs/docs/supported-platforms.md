# Supported Platforms

Agent Resources can install packages to multiple AI coding tools. It automatically detects which platforms you're using.

---

## Automatic Platform Detection

When you run `agr install`, the tool automatically detects your platform by checking:

1. **Existing directories** — looks for `.claude/`, `.cursor/`, `.codex/`, `.opencode/`
2. **Config files** — checks for `CLAUDE.md`, `AGENTS.md`, `.cursorrules`
3. **Running processes** — detects if you're running inside Claude Code, Cursor, etc.

If multiple platforms are detected, resources install to all of them. If none are detected, it defaults to Claude Code.

---

## List Detected Platforms

See which platforms are detected in the current project:

```bash
agr platforms
```

Example output:

```
Detected platforms:
  Claude Code    .claude/        (primary)
  Cursor         .cursor/
```

The primary platform is marked based on which tool you're currently running in.

---

## Install Behavior

By default, packages install to all detected platforms:

```bash
agr install anthropics/code-reviewer
```

```
Detected platforms: Claude Code (primary), Cursor

Installing to:
  Claude Code: .claude/skills/code-reviewer/
  Cursor: .cursor/skills/code-reviewer/

Done
```

---

## Install for Specific Platform

Install to a single platform only:

```bash
agr install anthropics/code-reviewer --platform=claude
agr install anthropics/code-reviewer --platform=cursor
agr install anthropics/code-reviewer --platform=codex
agr install anthropics/code-reviewer --platform=opencode
```

---

## Supported Platforms

| Platform | Flag | Directory |
|----------|------|-----------|
| Claude Code | `--platform=claude` | `.claude/` |
| Cursor | `--platform=cursor` | `.cursor/` |
| OpenAI Codex | `--platform=codex` | `.codex/` |
| OpenCode | `--platform=opencode` | `.opencode/` |
