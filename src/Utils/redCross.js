if (typeof process !== "undefined" && process.stdout.isTTY) {
  let redCross = "✘ ";
  redCross = "\x1b[31m" + "✘ " + "\x1b[0m";

  const originalConsoleError = console.error;
  console.error = function (...args) {
    originalConsoleError.call(console, redCross + args.join(" "));
  };

  process.on("uncaughtException", (err) => {
    console.error(err.message);
    process.exit(1);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error(reason);
    process.exit(1);
  });
}
