---
title: CLI reference
---

# CLI reference

## Global help

```bash
agr --help
```

## agr add

Add resources from GitHub.

### Commands

```bash
agr add skill <username>/<name>
agr add command <username>/<name>
agr add agent <username>/<name>
```

### Options

- `--global`, `-g`: install to `~/.claude/` instead of the current directory
- `--overwrite`: replace an existing resource

### Examples

```bash
agr add skill kasperjunge/hello-world
agr add command acme/tools/review --global
agr add agent acme/agents/test-writer --overwrite
```

### Custom repo name

```bash
agr add skill username/custom-repo/my-skill
```

### Nested paths

```bash
agr add skill username/backend:hello-world
```

## agr init

Create scaffolds for repositories and resources.

### Create a repository

```bash
agr init repo
agr init repo my-resources
agr init repo .
```

Options:

- `--path`, `-p`: custom output path
- `--github`, `-g`: create a GitHub repo and push (requires `gh`)

### Create a skill

```bash
agr init skill my-skill
```

Options:

- `--path`, `-p`: custom output path

### Create a command

```bash
agr init command my-command
```

Options:

- `--path`, `-p`: custom output path

### Create an agent

```bash
agr init agent my-agent
```

Options:

- `--path`, `-p`: custom output path
