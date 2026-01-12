---
title: Installing resources
---

# Installing resources

Install skills, commands, and agents directly from GitHub.

## Install from the default repo name

If a user has a repo named `agent-resources`, you only need the username:

```bash
agr add skill username/my-skill
agr add command username/my-command
agr add agent username/my-agent
```

## Install from a custom repo name

If the repo name is not `agent-resources`, include it:

```bash
agr add skill username/custom-repo/my-skill
```

## Install nested resources

You can organize resources into nested folders and reference them with `:`.
For example, this installs from:

```bash
agr add skill username/backend:hello-world
```

```
./
└── .claude/
    └── skills/
        └── backend/
            └── hello-world/
```

The same pattern works for commands and agents.

## Install globally

Global installs go to `~/.claude/` instead of the current project:

```bash
agr add skill username/my-skill --global
```

## Overwrite an existing resource

```bash
agr add skill username/my-skill --overwrite
```

## Verify the install

Check that files exist in `.claude/` or `~/.claude/`, then run your command or let your
agent use the skill automatically.
