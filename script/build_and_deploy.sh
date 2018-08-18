#! /bin/bash

set -euxo pipefail

elm-make Main.elm --output index.html

git checkout -B gh-pages
git add index.html
git commit -m "deploy"
git push origin gh-pages

git checkout master
