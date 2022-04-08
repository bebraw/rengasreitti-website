#!/usr/bin/env bash
curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.20.4
/opt/buildhome/.deno/bin/deno run -qA https://code.velociraptor.run ci:build