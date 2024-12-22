#!/bin/sh

# Usage: sh .scripts/build.sh
# Description: Build the project and generate manifest.json file for Chrome extension
# Dependencies: vite, node
# Arguments: mode (development, production, staging) default: development
# .scripts/build.sh [development | production | staging]
# Example: sh .scripts/build.sh production

MODE=${1:-"development"}

# return if invalid mode
if [ "$MODE" != "development" ] && [ "$MODE" != "production" ] && [ "$MODE" != "staging" ]; then
  echo "Invalid mode: $MODE"
  echo "Usage: sh .scripts/build.sh [development | production | staging]"
  exit 1
fi

echo "Building the project in $MODE mode"

if [ "$MODE" = "production" ]; then
  node -e "
    const fs = require('fs'); 
    
    const manifest = require('./public/manifest.json');
    const package = require('./package.json');
    if (manifest.version !== package.version) {
      console.log('Updating manifest.json version:', manifest.version, '->', package.version);

      manifest.version = package.version;
      fs.writeFileSync('./public/manifest.json', JSON.stringify(manifest, null, 2));
    } else {
      console.log('Version is up to date');
    }
  "
fi 

vite build --mode $MODE