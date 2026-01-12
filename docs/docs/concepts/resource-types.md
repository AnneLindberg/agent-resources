---
title: Resource types
---

# Resource types

agr manages three resource types for Claude Code.

## Skills

A skill is a directory with a `SKILL.md` file that defines behavior and instructions.

```
./
└── .claude/
    └── skills/
        └── code-reviewer/
            └── SKILL.md
```

## Commands

A command is a markdown file that defines what happens when a user runs a slash command.

```
./
└── .claude/
    └── commands/
        └── review.md
```

## Agents

An agent is a markdown file that defines a sub-agent that your main agent can delegate to.

```
./
└── .claude/
    └── agents/
        └── test-writer.md
```
