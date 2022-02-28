#!/bin/bash -eu

# cd to the root dir
ROOT="$(pwd)/$(dirname "$0")/.."
cd "$ROOT" || exit 1

PATH="$(npm bin):$PATH"
BUILD_DIR="$ROOT/build"
DIST_DIR="$ROOT/dist"

# Clean up output dir
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

## Transpile CommonJS versions of files
tsc

# Transpile CommonJS versions of files
babel --env-name commonjs "$BUILD_DIR" --source-root src --out-dir "$DIST_DIR" --copy-files --quiet

# Transpile ESM versions of files for the browser
babel --env-name esmBrowser "$BUILD_DIR" --source-root src --out-dir "$DIST_DIR/esm-browser" --copy-files --quiet

# Transpile ESM versions of files for node
babel --env-name esmNode "$BUILD_DIR" --source-root src --out-dir "$DIST_DIR/esm-node" --copy-files --quiet
