---
title: Creating a shareable repo
---

# Creating a shareable repo

Use `agr init repo` to scaffold a repository that others can install from.

## Create a new repository

```bash
agr init repo
```

This creates `./agent-resources/` with a starter `.claude/` structure and example resources.

## Create in a specific location

```bash
agr init repo my-resources
agr init repo .
```

- `my-resources` creates `./my-resources/`
- `.` initializes the current directory

## Create and push to GitHub

```bash
agr init repo agent-resources --github
```

This uses the GitHub CLI (`gh`) to create a repo and push the initial commit.
Make sure you have `gh auth login` configured.

## Recommended repo name

If the repository is named `agent-resources`, users can install with:

```bash
agr add skill username/my-skill
```

If the repo has a different name, users must include it:

```bash
agr add skill username/custom-repo/my-skill
```

## Next steps

- Customize the resources in `.claude/`
- Push to GitHub and share your username and resource names
