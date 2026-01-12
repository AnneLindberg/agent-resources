"""Re-export CLI utilities from agr for backwards compatibility."""

from agr.cli.common import (
    DEFAULT_REPO_NAME,
    console,
    fetch_spinner,
    get_destination,
    handle_add_resource,
    parse_nested_name,
    parse_resource_ref,
    print_success_message,
)

# Re-export ResourceType for backwards compatibility
from agr.fetcher import ResourceType

__all__ = [
    "console",
    "DEFAULT_REPO_NAME",
    "parse_nested_name",
    "parse_resource_ref",
    "get_destination",
    "fetch_spinner",
    "print_success_message",
    "handle_add_resource",
    "ResourceType",
]
