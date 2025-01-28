#!/bin/sh

rm -f dist.zip
cd dist
zip -r -FS ../dist.zip *
echo "Zipped dist folder to dist.zip"
cd ..