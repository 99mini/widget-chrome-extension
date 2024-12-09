#!/bin/sh

# Usage: sh .scripts/build.sh
# Description: Build the project and generate manifest.json file for Chrome extension
# Dependencies: vite, node
# Arguments: mode (development, production, staging) default: development
# .scripts/build.sh [development | production | staging]
# Example: sh .scripts/build.sh production

MODE=${1:-"development"}

echo "Building the project in $MODE mode"

if [ "$MODE" = "production" ]; then
  # sync with package.json version to public/manifest.json

  # read package.json version
  version=$(node -p "require('./package.json').version")

  # generate manifest.json

  echo "{
  \"manifest_version\": 3,
  \"name\": \"widget chrome extension\",
  \"description\": \"A Chrome extension for a custom new tab. 새 탭 커스텀 크롬 익스텐션입니다.\",
  \"version\": \"$version\",
  \"action\": {
    \"default_popup\": \"popup.html\"
  },
  \"permissions\": [\"storage\", \"bookmarks\"],
  \"chrome_url_overrides\": {
    \"newtab\": \"index.html\"
  }
}" > public/manifest.json

  echo "Generated manifest.json file with version $version"
fi 

vite build --mode $MODE