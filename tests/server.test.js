import http from "http";
import { jest } from "@jest/globals";
import { promises as fs } from "fs";

// Мокаем fs.readFile
jest.mock("fs", () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

const PORT = 4000; // Используйте другой порт для тестов

const createServer = async () => {
  const filePath = "./src/GUI/index.html";

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

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`Test server is running on port ${PORT}`);
      resolve(server);
    });
  });
};

describe("HTTP Server", () => {
  let server;

  beforeAll(async () => {
    server = await createServer();
  });

  afterAll(() => {
    server.close();
  });

  test("should return 200 and HTML content on GET /", async () => {
    const mockData = "<html><body>Test</body></html>";
    fs.readFile.mockResolvedValue(mockData);

    const response = await fetch(`http://localhost:${PORT}/`);
    const text = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/html");
    expect(text).toBe(mockData);
  });

  test("should return 500 on GET / if file reading fails", async () => {
    fs.readFile.mockRejectedValue(new Error("File not found"));

    const response = await fetch(`http://localhost:${PORT}/`);
    const text = await response.text();

    expect(response.status).toBe(500);
    expect(response.headers.get("content-type")).toBe("text/plain");
    expect(text).toBe("Internal Server Error");
  });

  test("should return 404 on GET /not-found", async () => {
    const response = await fetch(`http://localhost:${PORT}/not-found`);
    const text = await response.text();

    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toBe("text/plain");
    expect(text).toBe("Not Found");
  });
});
