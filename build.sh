#!/usr/bin/env bash
curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.20.4
deno run -qA https://code.velociraptor.run ci:build