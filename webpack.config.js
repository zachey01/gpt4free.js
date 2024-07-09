"use strict";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const browserConfig = {
  target: "web",
  entry: "./index.js",
  output: {
    filename: "gpt4js.min.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    compress: true,
    port: 9000,
  },
};

export default browserConfig;
