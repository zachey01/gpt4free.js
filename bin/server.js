#!/usr/bin/env node

import http from "http";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.argv[2] || 3000;
const filePath = "./gui/index.html";

const server = http.createServer(async (req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  if (req.method === "GET" && req.url === "/") {
    try {
      const data = await fs.readFile(filePath, "utf8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
      console.log(`Served file: ${filePath}`);
    } catch (err) {
      console.error(`Error reading file: ${err.message}`);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
    console.log("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
