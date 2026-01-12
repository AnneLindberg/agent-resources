---
title: First steps
---

# First steps

This page gets you from zero to a working resource.

## Install a skill

```bash
agr add skill kasperjunge/hello-world
```

This installs the skill into:

```
./
└── .claude/
    └── skills/
        └── hello-world/
```

## Install a command or agent

```bash
agr add command kasperjunge/hello-world
agr add agent kasperjunge/hello-world
```

Commands install into:

```
./
└── .claude/
    ├── commands/
    │   └── hello-world.md
    └── agents/
        └── hello-world.md
```

## Use your resource

Once installed, your agent can use the new skill automatically and you can run slash commands
inside Claude Code. No additional configuration is required.

## Common options

```bash
# Install globally instead of in the current repo
agr add skill kasperjunge/hello-world --global

# Overwrite an existing resource
agr add skill kasperjunge/hello-world --overwrite
```

## Next steps

- Learn more in [Installing resources](../guides/installing-resources.md)
- Understand layouts in [Repository structure](../concepts/repository-structure.md)
