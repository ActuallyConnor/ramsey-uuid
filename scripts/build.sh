#!/bin/bash -eu

# cd to the root dir
ROOT="$(pwd)/$(dirname "$0")/.."
cd "$ROOT" || exit 1

PATH="$(npm bin):$PATH"
DIR="$ROOT/dist"

# Clean up output dir
rm -rf "$DIR"
mkdir -p "$DIR"

## Transpile CommonJS versions of files
tsc src/index.ts src/Uuid.ts src/UuidInterface.ts --module commonjs --target es2020 --outDir "$DIR"

## Transpile ESM versions of files for node
tsc src/index.ts src/Uuid.ts src/UuidInterface.ts --module commonjs --target es2020 --outDir "$DIR/esm-node"
