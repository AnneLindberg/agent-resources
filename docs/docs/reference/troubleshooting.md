---
title: Troubleshooting
---

# Troubleshooting

## Repository not found

If you see an error about a missing repository, check:

- The GitHub username and repo name are correct
- The repository is public
- The default branch is `main`

## Resource not found

If agr reports that a resource does not exist, confirm the path in the repo:

- Skills: `.claude/skills/<name>/SKILL.md`
- Commands: `.claude/commands/<name>.md`
- Agents: `.claude/agents/<name>.md`

If you use nested paths, verify the folder structure matches the `:` segments.

## Resource already exists

If the destination exists, rerun with `--overwrite`:

```bash
agr add skill username/my-skill --overwrite
```

## Network errors

agr downloads from GitHub. Ensure you have network access and try again.
