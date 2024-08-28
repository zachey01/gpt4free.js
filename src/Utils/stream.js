"use strict";
async function startStreaming(response, onData) {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = [];
  let seenChunks = new Set();
  let shouldContinue = true;
  let delayTimeout;

  while (shouldContinue) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer.push(decoder.decode(value, { stream: true }));

    if (delayTimeout) {
      clearTimeout(delayTimeout);
    }

    delayTimeout = setTimeout(() => {
      shouldContinue = processChunks(buffer, seenChunks, onData);
      buffer.length = 0; // Clear the buffer
    }, 100);
  }

  return "";
}

function processChunks(buffer, seenChunks, onData) {
  let combinedChunks = buffer.join("");
  let chunks = combinedChunks.split("\n");

  let chunkAccumulator = "";

  for (let chunk of chunks) {
    chunk = chunk.replace(/^data: /, "").trim();

    // Ignore the [DONE] token
    if (chunk === "[DONE]") {
      continue;
    }

    if (chunk !== "" && chunk !== undefined) {
      seenChunks.add(chunk);
      chunkAccumulator += chunk;

      // Check for the pattern "> provided by ..." with delay
      if (
        chunkAccumulator.includes(">") &&
        chunkAccumulator.includes("p") &&
        chunkAccumulator.includes("r")
      ) {
        return false;
      }

      try {
        let chunkObj = JSON.parse(chunk);

        if (chunkObj.choices) {
          let content = chunkObj.choices[0]?.delta?.content || "";

          content = content.replace(/\s+/g, " ").trim();
          if (content !== "") {
            onData(content);
          }
        } else if (chunkObj.gpt) {
          let content = chunkObj.gpt || "";

          content = content.replace(/\s+/g, " ").trim();
          if (content !== "") {
            onData(content);
          }
        }
      } catch (error) {
        console.error("Error parsing chunk:", error);
      }
    }
  }

  return true; // Continue streaming
}

export default startStreaming;
