# skill-add

Add Claude Code skills from GitHub to your project.

## Usage

```bash
uvx skill-add <username>/<skill-name>
```

This fetches a skill from the user's `agent-skills` repository on GitHub and copies it to `.claude/skills/` in your current directory.

### Examples

```bash
# Add a skill
uvx skill-add kasperjunge/analyze-paper

# Overwrite an existing skill
uvx skill-add kasperjunge/analyze-paper --overwrite
```

## Repository Structure

Your `agent-skills` repository should have this structure:

```
agent-skills/
└── .claude/
    └── skills/
        ├── skill-one/
        │   └── SKILL.md
        └── skill-two/
            ├── SKILL.md
            └── scripts/
                └── helper.py
```

Each skill is a directory containing at minimum a `SKILL.md` file.

## Installation

```bash
# Run directly with uvx (recommended)
uvx skill-add <username>/<skill-name>

# Or install globally
pip install skill-add
```
