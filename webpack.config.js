"use strict";
import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Browser configuration
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
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    compress: true,
    port: 9000,
  },
};

// CommonJS configuration
const commonJsConfig = {
  target: "node",
  entry: "./index.js",
  output: {
    filename: "gpt4js.cjs",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "commonjs2",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};

export default [browserConfig, commonJsConfig];
