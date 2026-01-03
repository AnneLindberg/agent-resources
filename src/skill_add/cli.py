from pathlib import Path
from typing import Annotated

import typer

from skill_add.github import (
    RepoNotFoundError,
    SkillAddError,
    SkillExistsError,
    SkillNotFoundError,
    fetch_skill,
)

app = typer.Typer(
    add_completion=False,
    help="Add Claude Code skills from GitHub to your project.",
)


def parse_skill_ref(skill_ref: str) -> tuple[str, str]:
    """Parse '<username>/<skill-name>' into components."""
    parts = skill_ref.split("/")
    if len(parts) != 2:
        raise typer.BadParameter(
            f"Invalid format: '{skill_ref}'. Expected: <username>/<skill-name>"
        )
    username, skill_name = parts
    if not username or not skill_name:
        raise typer.BadParameter(
            f"Invalid format: '{skill_ref}'. Expected: <username>/<skill-name>"
        )
    return username, skill_name


@app.command()
def add(
    skill_ref: Annotated[
        str,
        typer.Argument(
            help="Skill to add in format: <username>/<skill-name>",
            metavar="USERNAME/SKILL-NAME",
        ),
    ],
    overwrite: Annotated[
        bool,
        typer.Option(
            "--overwrite",
            help="Overwrite existing skill if it exists.",
        ),
    ] = False,
) -> None:
    """
    Add a skill from a GitHub user's agent-skills repository.

    The skill will be copied to .claude/skills/<skill-name>/ in the current directory.

    Example:
        skill-add kasperjunge/analyze-paper
    """
    # Parse the skill reference
    try:
        username, skill_name = parse_skill_ref(skill_ref)
    except typer.BadParameter as e:
        typer.echo(f"Error: {e}", err=True)
        raise typer.Exit(1)

    # Destination is .claude/skills/ in current directory
    dest = Path.cwd() / ".claude" / "skills"

    typer.echo(f"Fetching skill '{skill_name}' from {username}/agent-skills...")

    try:
        skill_path = fetch_skill(username, skill_name, dest, overwrite)
        typer.echo(f"Added skill '{skill_name}' to {skill_path}")
    except RepoNotFoundError as e:
        typer.echo(f"Error: {e}", err=True)
        raise typer.Exit(1)
    except SkillNotFoundError as e:
        typer.echo(f"Error: {e}", err=True)
        raise typer.Exit(1)
    except SkillExistsError as e:
        typer.echo(f"Error: {e}", err=True)
        raise typer.Exit(1)
    except SkillAddError as e:
        typer.echo(f"Error: {e}", err=True)
        raise typer.Exit(1)


if __name__ == "__main__":
    app()
