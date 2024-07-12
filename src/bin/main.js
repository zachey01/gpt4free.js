#!/usr/bin/env node

import process from "process";
import http from "http";
import fs from "fs";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import GPT4js from "../../index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);

function parseArgs(args) {
  const parsedArgs = {};
  let guiEncountered = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "g") {
      parsedArgs["gui"] = true;
      guiEncountered = true;

      if (args[i + 1] && !args[i + 1].startsWith("--") && !isNaN(args[i + 1])) {
        parsedArgs["port"] = args[i + 1];
        i++;
      }
    } else if (guiEncountered && !parsedArgs["port"] && !isNaN(arg)) {
      parsedArgs["port"] = arg;
    } else if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const nextArg = args[i + 1];

      if (nextArg && !nextArg.startsWith("--")) {
        parsedArgs[key] = nextArg;
        i++;
      } else {
        parsedArgs[key] = true;
      }
    }
  }

  return parsedArgs;
}

const parsedArgs = parseArgs(args);

if (parsedArgs["gui"]) {
  const port = parsedArgs["port"] || 3000;

  const server = http.createServer((req, res) => {
    if (req.url === "/") {
      const indexPath = "./src/GUI/index.html";
      const indexHtml = fs.readFileSync(indexPath, "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(indexHtml);
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  server.listen(port, () => {
    console.log(
      `\x1b[32m✓\x1b[0m Server listening on port \x1b[30;47m${port}\x1b[0m`
    );
  });
} else {
  if ((parsedArgs["m"] || parsedArgs["p"]) && !parsedArgs["prompt"]) {
    console.error(
      "Error: 'prompt' argument is required when 'model' and 'provider' is specified."
    );
    process.exit(1);
  }

  const messages = [{ role: "user", content: parsedArgs.prompt }];
  const options = {
    provider: parsedArgs.provider,
    model: parsedArgs.model,
  };

  (async () => {
    const provider = GPT4js.createProvider(options.provider);
    try {
      const text = await provider.chatCompletion(messages, options);
      console.log("🤖: " + text);
    } catch (error) {
      console.error("Error:", error);
    }
  })();
}
