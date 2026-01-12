"""Re-export scaffold functions from agr for backwards compatibility."""

from agr.scaffold import (
    GITIGNORE,
    HELLO_AGENT,
    HELLO_COMMAND,
    HELLO_SKILL,
    README_TEMPLATE,
    create_agent_resources_repo,
    init_git,
    scaffold_repo,
    write_gitignore,
    write_readme,
    write_starter_agent,
    write_starter_command,
    write_starter_skill,
)

__all__ = [
    "HELLO_SKILL",
    "HELLO_COMMAND",
    "HELLO_AGENT",
    "README_TEMPLATE",
    "GITIGNORE",
    "scaffold_repo",
    "write_starter_skill",
    "write_starter_command",
    "write_starter_agent",
    "write_readme",
    "write_gitignore",
    "init_git",
    "create_agent_resources_repo",
]
