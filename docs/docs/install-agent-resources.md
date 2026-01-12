# Install Agent Resources

Install skills, commands, and agents from GitHub with a single command.

---

## Install Individual Resources

Install skills, commands, and subagents individually:

```bash
# Install a skill
agr add skill username/skillname

# Install a command
agr add command username/commandname

# Install a subagent
agr add agent username/agentname
```

---

## Using uvx

All commands work with `uvx` if you don't want to install `agr` globally:

```bash
uvx agr add username/packagename
```

---

## Installation Options

Install globally (available in all projects):

```bash
agr add skill username/skillname --global
```

Overwrite an existing resource:

```bash
agr add skill username/skillname --overwrite
```
