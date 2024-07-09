import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["index.js"],
    outfile: "index.cjs",
    bundle: false,
    format: "cjs",
  })
  .catch(() => process.exit(1));
