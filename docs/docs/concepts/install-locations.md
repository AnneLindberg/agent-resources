---
title: Install locations
---

# Install locations

agr installs resources into either the current project or your global Claude directory.

## Project-local installs

Default behavior installs into the current working directory:

```
./
└── .claude/
    ├── skills/
    ├── commands/
    └── agents/
```

## Global installs

Use `--global` (or `-g`) to install into your home directory:

```bash
agr add skill username/my-skill --global
```

This writes to:

```
~/
└── .claude/
    ├── skills/
    ├── commands/
    └── agents/
```

## Overwrites

If a resource already exists, you must pass `--overwrite` to replace it.
