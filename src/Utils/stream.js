async function startStreaming(response, onData) {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  const buffer = [];
  const seenChunks = new Set();

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer.push(decoder.decode(value, { stream: true }));
    let combinedChunks = buffer.join("");
    buffer.length = 0; // Clear the buffer

    let chunks = combinedChunks.split("\n");

    chunks.forEach((chunk) => {
      chunk = chunk.replace(/^data: /, "");
      if (chunk.trim() !== "" && !seenChunks.has(chunk)) {
        seenChunks.add(chunk);
        if (chunk.trim() === "[DONE]" || chunk.trim().match(/>\s*p\s*r\s*o\s*v\s*i\s*d\s*e\s*d/i)) {
          return; // Skip processing [DONE] or "> provided" (For Nextway) responses
        }        
        try {
          let chunkObj = JSON.parse(chunk);
          onData(chunkObj.choices[0].delta.content);
        } catch (error) {
          console.error("Error parsing chunk:", error);
        }
      }
    });
  }

  return "";
}

export default startStreaming;
