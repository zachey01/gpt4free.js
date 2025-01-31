export default async function startStreaming(response, onData) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let buffer = "";

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    buffer += decoder.decode(value, { stream: true }).replace(/\r?\n|\r/g, " ");
    try {
      while (buffer) {
        let parsedData;
        try {
          parsedData = JSON.parse(buffer);
        } catch (e) {
          break;
        }
        if (parsedData?.message?.content) {
          onData(parsedData.message.content);
        }
        buffer = "";
      }
    } catch (error) {
      console.error("Error parsing buffer:", error);
    }
  }
  if (buffer.length > 0) {
    try {
      const parsedData = JSON.parse(buffer);
      if (parsedData?.message?.content) {
        onData(parsedData.message.content);
      }
    } catch (error) {
      console.error("Failed to parse remaining buffer:", buffer, error);
    }
  }
}
