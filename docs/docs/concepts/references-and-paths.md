---
title: References and paths
---

# References and paths

Resources are referenced by GitHub owner and name.

## Reference formats

Short form (default repo name `agent-resources`):

```
<username>/<resource-name>
```

Full form (custom repo name):

```
<username>/<repo>/<resource-name>
```

Examples:

```
agr add skill kasperjunge/hello-world
agr add command acme/tools/review
```

## Nested resources with colons

A resource name may include `:` to represent nested folders:

```
agr add skill username/backend:hello-world
```

This maps to:

```
./
└── .claude/
    └── skills/
        └── backend/
            └── hello-world/
```

Commands and agents follow the same rule, with `.md` files at the end of the path.
