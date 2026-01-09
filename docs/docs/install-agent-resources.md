# Install Agent Resources

There are several ways to install resources depending on what you need.

---

## Install a Package

Packages bundle skills, commands, and agents together:

```bash
agr install username/packagename
```

---

## Install Individual Resources

You can also install skills, commands, and agents individually:

```bash
# Install a skill
agr install skill username/skillname

# Install a command
agr install command username/commandname

# Install an agent
agr install agent username/agentname
```

---

## Using uvx

All commands work with `uvx` if you don't want to install `agr` globally:

```bash
uvx agr install username/packagename
```

---

## Installation Options

Install globally (available in all projects):

```bash
agr install username/packagename --global
```

Overwrite an existing resource:

```bash
agr install username/packagename --overwrite
```
