#!/usr/bin/env bash
curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.20.4
/opt/buildhome/.deno/bin/deno run -A --unstable --no-check https://deno.land/x/gustwind@${VERSION}/cli.ts -b