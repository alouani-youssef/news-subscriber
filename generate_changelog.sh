#!/bin/bash

# File where changelog will be written
CHANGELOG_FILE="CHANGELOG.md"

# Get the latest tag to generate changelog from commits after that tag
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null)

# If there's no tag, start from the initial commit
if [ -z "$LATEST_TAG" ]; then
  echo "No tags found. Generating changelog from the first commit."
  LATEST_TAG=$(git rev-list --max-parents=0 HEAD)
else
  echo "Generating changelog from tag: $LATEST_TAG"
fi

# Get commit history from the latest tag to HEAD
COMMITS=$(git log $LATEST_TAG..HEAD --pretty=format:"%h - %s (%an, %ad)" --date=short)

# Check if there are any commits to add
if [ -z "$COMMITS" ]; then
  echo "No new commits found since the last tag."
  exit 0
fi

# Add a header to the changelog
echo -e "## [Unreleased] - $(date +%Y-%m-%d)\n" > temp_changelog.md

# Append commit messages to the changelog
echo "$COMMITS" >> temp_changelog.md

# Add a blank line
echo "" >> temp_changelog.md

# Append the current changelog to the new one
if [ -f "$CHANGELOG_FILE" ]; then
  cat $CHANGELOG_FILE >> temp_changelog.md
fi

# Replace the original changelog file with the new one
mv temp_changelog.md $CHANGELOG_FILE

echo "Changelog updated!"