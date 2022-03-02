#!/bin/bash -eu

# cd to the root dir
ROOT="$(pwd)/$(dirname "$0")/.."
cd "$ROOT" || exit 1

PATH="$(npm bin):$PATH"
BUILD_DIR="$ROOT/build"
DOCS_DIR="$ROOT/docs"
DOCDASH_DIR="$ROOT/node_modules/docdash"

# Clean up docs dir
rm -rf "$DOCS_DIR"
mkdir "$DOCS_DIR"

# Compile docs
jsdoc -d docs "$BUILD_DIR" -t "$DOCDASH_DIR"
