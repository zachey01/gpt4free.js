const getGPT4js = require("./index.cjs");

(async () => {
  const GPT4js = await getGPT4js();
  const provider = GPT4js.createProvider("Aryahcr");
  console.log(provider);
})();
