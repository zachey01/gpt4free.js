import http from "http";
import fs from "fs";
import path from "path";
import GPT4js from "../src/providers.js";

describe("Server Tests", () => {
  let server;

  beforeAll(() => {
    server = http.createServer((req, res) => {
      if (req.url === "/") {
        const indexPath = path.join(__dirname, "../src/GUI/index.html");
        const indexHtml = fs.readFileSync(indexPath, "utf-8");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(indexHtml);
      } else {
        res.writeHead(404);
        res.end();
      }
    });

    server.listen(3000);
  });

  afterAll((done) => {
    server.close(done);
  });

  it("should return HTML content for / route", async () => {
    const response = await fetch("http://localhost:3000");
    expect(response.status).toBe(200);

    const responseBody = await response.text();
    expect(responseBody).toContain("GPT4js GUI");
  });
});

describe("Chatbot Tests", () => {
  it("should initialize chatbot with correct options", async () => {
    const mockProvider = {
      chatCompletion: jest.fn().mockResolvedValue("Hello, world!"),
    };
    jest.spyOn(GPT4js, "createProvider").mockReturnValue(mockProvider);

    process.argv = [
      "node",
      "bin.js",
      "--m",
      "gpt-4o-free",
      "--p",
      "Nextway",
      "--prompt",
      "Hello",
    ];
  });
});
