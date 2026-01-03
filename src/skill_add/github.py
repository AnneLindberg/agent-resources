import shutil
import tarfile
import tempfile
from pathlib import Path

import httpx


class SkillAddError(Exception):
    """Base exception for skill-add errors."""

    pass


class RepoNotFoundError(SkillAddError):
    """Raised when the agent-skills repo doesn't exist."""

    pass


class SkillNotFoundError(SkillAddError):
    """Raised when the skill doesn't exist in the repo."""

    pass


class SkillExistsError(SkillAddError):
    """Raised when the skill already exists locally."""

    pass


def fetch_skill(username: str, skill_name: str, dest: Path, overwrite: bool = False) -> Path:
    """
    Fetch a skill from a user's agent-skills repo and copy it to dest.

    Args:
        username: GitHub username
        skill_name: Name of the skill to fetch
        dest: Destination directory (typically .claude/skills/)
        overwrite: Whether to overwrite existing skill

    Returns:
        Path to the installed skill directory

    Raises:
        RepoNotFoundError: If the agent-skills repo doesn't exist
        SkillNotFoundError: If the skill doesn't exist in the repo
        SkillExistsError: If skill exists locally and overwrite=False
    """
    skill_dest = dest / skill_name

    # Check if skill already exists locally
    if skill_dest.exists() and not overwrite:
        raise SkillExistsError(
            f"Skill '{skill_name}' already exists at {skill_dest}\n"
            f"Use --overwrite to replace it."
        )

    # Download tarball
    tarball_url = f"https://github.com/{username}/agent-skills/archive/refs/heads/main.tar.gz"

    with tempfile.TemporaryDirectory() as tmp_dir:
        tmp_path = Path(tmp_dir)
        tarball_path = tmp_path / "repo.tar.gz"

        # Download
        try:
            with httpx.Client(follow_redirects=True, timeout=30.0) as client:
                response = client.get(tarball_url)
                if response.status_code == 404:
                    raise RepoNotFoundError(
                        f"Repository '{username}/agent-skills' not found on GitHub."
                    )
                response.raise_for_status()

                tarball_path.write_bytes(response.content)
        except httpx.HTTPStatusError as e:
            raise SkillAddError(f"Failed to download repository: {e}")
        except httpx.RequestError as e:
            raise SkillAddError(f"Network error: {e}")

        # Extract
        extract_path = tmp_path / "extracted"
        with tarfile.open(tarball_path, "r:gz") as tar:
            tar.extractall(extract_path)

        # Find the skill in extracted content
        # Tarball extracts to: agent-skills-main/.claude/skills/<skill-name>/
        repo_dir = extract_path / "agent-skills-main"
        skill_source = repo_dir / ".claude" / "skills" / skill_name

        if not skill_source.exists():
            raise SkillNotFoundError(
                f"Skill '{skill_name}' not found in {username}/agent-skills.\n"
                f"Expected location: .claude/skills/{skill_name}/"
            )

        # Remove existing if overwriting
        if skill_dest.exists():
            shutil.rmtree(skill_dest)

        # Ensure destination parent exists
        dest.mkdir(parents=True, exist_ok=True)

        # Copy skill to destination
        shutil.copytree(skill_source, skill_dest)

    return skill_dest
