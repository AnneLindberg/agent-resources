---
title: Repository structure
---

# Repository structure

agr reads resources from a GitHub repository with a `.claude/` directory.

```
./
└── .claude/
    ├── skills/
    │   └── <skill-name>/
    │       └── SKILL.md
    ├── commands/
    │   └── <command-name>.md
    └── agents/
        └── <agent-name>.md
```

## Branch requirement

Resources are fetched from the `main` branch. Repositories that only have `master`
won't work until you create a `main` branch or change the default branch to `main`.

## Naming convention

If your repository is named `agent-resources`, users can install with the short form:

```
username/resource-name
```

If the repository name is different, users must include it:

```
username/repo-name/resource-name
```
