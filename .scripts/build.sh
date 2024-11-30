# sync with package.json version to public/manifest.json

# read package.json version
version=$(node -p "require('./package.json').version")

# generate manifest.json

# {
#   "manifest_version": 3,
#   "name": "widget chrome extension",
#   "description": "A Chrome extension for a custom new tab. 새 탭 커스텀 크롬 익스텐션입니다.",
#   "version": "0.1.0",
#   "action": {
#     "default_popup": "index.html"
#   },
#   "permissions": ["storage", "bookmarks"],
#   "chrome_url_overrides": {
#     "newtab": "index.html"
#   }
# }

echo "{
  \"manifest_version\": 3,
  \"name\": \"widget chrome extension\",
  \"description\": \"A Chrome extension for a custom new tab. 새 탭 커스텀 크롬 익스텐션입니다.\",
  \"version\": \"$version\",
  \"action\": {
    \"default_popup\": \"index.html\"
  },
  \"permissions\": [\"storage\", \"bookmarks\"],
  \"chrome_url_overrides\": {
    \"newtab\": \"index.html\"
  }
}" > public/manifest.json

vite build