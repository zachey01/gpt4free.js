"use strict";
module.exports = async function () {
  const { default: GPT4js } = await import("./index.js");
  return GPT4js;
};
