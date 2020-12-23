#!/usr/bin/env bash
set -xeo pipefail

cp package.template.json package.json

cp yarn.template.lock yarn.lock

yarn install