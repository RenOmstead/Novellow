#!/usr/bin/env bash
# Builds the site into _site/ for publishing. Cloudflare runs this on
# every push to main: build command "bash build.sh", output directory
# "_site" (see docs/SETUP.md).
#
# Every relative file reference in the site ends in ?v=__VERSION__.
# This replaces __VERSION__ with the commit being published, so each
# release loads fresh CSS and JavaScript instead of a stale cached
# copy. Only the site itself is published: not sql/, docs/ or this.
set -euo pipefail

SHA="${CF_PAGES_COMMIT_SHA:-${WORKERS_CI_COMMIT_SHA:-${GITHUB_SHA:-$(git rev-parse HEAD 2>/dev/null || date +%s)}}}"
VERSION="${SHA::8}"

rm -rf _site
mkdir -p _site
cp -r *.html manifest.webmanifest css js assets _site/

find _site -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.svg' \) \
    -exec sed -i "s/__VERSION__/${VERSION}/g" {} +

if grep -rl "__VERSION__" _site; then
    echo "Some files still contain __VERSION__" && exit 1
fi

echo "Built _site (version ${VERSION})"
