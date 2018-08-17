#! /bin/bash

set -euxo pipefail

trap 'kill $(jobs -p)' SIGINT

npm install -g browser-sync

browser-sync start --server -w --no-open &

for job in $(jobs -p); do
  wait $job
done
