#!/bin/bash
set -euo pipefail

# Sink Cabinet Fix: install dependencies so linting, type checks, and builds
# work in Claude Code on the web. Only runs in the remote environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# npm install (not ci) so the cached container can reuse node_modules across sessions.
npm install --no-audit --no-fund
