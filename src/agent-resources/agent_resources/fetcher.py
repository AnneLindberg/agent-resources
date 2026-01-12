"""Re-export fetcher from agr for backwards compatibility."""

from agr.fetcher import (
    RESOURCE_CONFIGS,
    ResourceConfig,
    ResourceType,
    fetch_resource,
)

__all__ = [
    "ResourceType",
    "ResourceConfig",
    "RESOURCE_CONFIGS",
    "fetch_resource",
]
