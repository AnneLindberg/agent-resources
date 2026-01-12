---
title: Creating resources
---

# Creating resources

Use `agr init` to scaffold new skills, commands, and agents.

## Create a skill

```bash
agr init skill code-reviewer
```

Creates:

```
./
└── .claude/
    └── skills/
        └── code-reviewer/
            └── SKILL.md
```

## Create a command

```bash
agr init command review
```

Creates:

```
./
└── .claude/
    └── commands/
        └── review.md
```

## Create an agent

```bash
agr init agent test-writer
```

Creates:

```
./
└── .claude/
    └── agents/
        └── test-writer.md
```

## Use a custom path

Each subcommand supports `--path` if you want to place files elsewhere:

```bash
agr init skill code-reviewer --path ./resources/skills/code-reviewer
agr init command review --path ./resources/commands
```

## Next steps

Edit the generated markdown to match your workflow, then share it by pushing to GitHub.
