"use strict";

/**
 * Starts streaming the response data.
 * @param {Response} response - Fetch API Response object.
 * @param {Function} onData - Callback to handle incoming data chunks.
 * @returns {Promise<string>} - Resolves when streaming is complete.
 */
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

/**
 * Processes buffered chunks.
 * @param {Array} buffer - Array of buffered string chunks.
 * @param {Set} seenChunks - Set to track seen chunks.
 * @param {Function} onData - Callback to handle data.
 * @returns {boolean} - Whether to continue streaming.
 */
function processChunks(buffer, seenChunks, onData) {
  const combinedChunks = buffer.join("");
  const chunks = combinedChunks.split("\n");

  let chunkAccumulator = "";

  for (let chunk of chunks) {
    chunk = chunk.replace(/^data: /, "").trim();

    // Ignore the [DONE] token
    if (chunk === "[DONE]") {
      continue;
    }

    if (chunk !== "" && chunk !== undefined) {
      if (seenChunks.has(chunk)) {
        continue; // Skip duplicate chunks
      }
      seenChunks.add(chunk);
      chunkAccumulator += chunk;

      // Check for the pattern "> provided by ..." with delay
      if (
        chunkAccumulator.includes(">") &&
        chunkAccumulator.includes("p") &&
        chunkAccumulator.includes("r")
      ) {
        return false; // Stop streaming
      }

      try {
        const chunkObj = JSON.parse(chunk);

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
