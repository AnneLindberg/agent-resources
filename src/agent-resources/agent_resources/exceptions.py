"""Re-export exceptions from agr for backwards compatibility."""

from agr.exceptions import (
    AgrError as ClaudeAddError,
    RepoNotFoundError,
    ResourceExistsError,
    ResourceNotFoundError,
)

__all__ = [
    "ClaudeAddError",
    "RepoNotFoundError",
    "ResourceNotFoundError",
    "ResourceExistsError",
]
