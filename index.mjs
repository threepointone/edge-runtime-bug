import { EdgeRuntime } from "edge-runtime";
import * as esbuild from "esbuild";

// Let's the bundle the code in initialCode.js
const initialCode = esbuild.buildSync({
  entryPoints: ["./initialCode.js"],
  bundle: true,
  write: false,
  format: "esm",
  target: "es2019",
  // minify: true, // uncommenting this line "fixes" the issue
}).outputFiles[0].text;

const runtime = new EdgeRuntime({
  initialCode,
});

const response = await runtime.dispatchFetch("https://example.com");

await response.waitUntil();

/* This gives the following error:

evalmachine.<anonymous>:6991
            throw new TypeError("Failed to parse URL from " + input, { cause: err });
                  ^

TypeError: Failed to parse URL from https://example.com
    at new Request (evalmachine.<anonymous>:6991:19)
    at EdgeRuntime.dispatchFetch (evalmachine.<anonymous>:2:21)
    at file:///Users/threepointone/code/edge-runtime-bug/index.mjs:17:32
    at ModuleJob.run (node:internal/modules/esm/module_job:194:25) {
  [cause]: RangeError: Invalid code point NaN
      at Function.fromCodePoint (<anonymous>)
      at new URLStateMachine (evalmachine.<anonymous>:1533:49)
      at module2.exports.basicURLParse (evalmachine.<anonymous>:2100:19)
      at new URLImpl (evalmachine.<anonymous>:2825:31)
      at exports.setup (evalmachine.<anonymous>:3020:16)
      at new URL (evalmachine.<anonymous>:3074:26)
      at new Request (evalmachine.<anonymous>:6989:25)
      at EdgeRuntime.dispatchFetch (evalmachine.<anonymous>:2:21)
      at file:///Users/threepointone/code/edge-runtime-bug/index.mjs:17:32
      at ModuleJob.run (node:internal/modules/esm/module_job:194:25)
}

*/
