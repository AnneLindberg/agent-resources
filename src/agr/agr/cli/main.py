"""Main CLI entrypoint for agr."""

import typer

from agr.cli.add import app as add_app
from agr.cli.init import app as init_app

app = typer.Typer(
    name="agr",
    help="Agent Resources - Install and create Claude Code skills, commands, and agents.",
    add_completion=False,
    no_args_is_help=True,
)

# Register subcommands
app.add_typer(add_app, name="add")
app.add_typer(init_app, name="init")


def main() -> None:
    """Main entry point."""
    app()


if __name__ == "__main__":
    main()
