#! /bin/bash

set -euxo pipefail

elm-test tests/
elm-make Main.elm --output /dev/null
elm-lint
