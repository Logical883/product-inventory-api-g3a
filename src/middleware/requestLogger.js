// REQUEST LOGGER (owner: S580-maker, branch: feature/error-handling)

module.exports = (req, res, next) => {
  // 1. Remember the start time
  const start = Date.now();
  const timestamp = new Date().toISOString();

  // 2. Wait for the response to finish to get the status code
  res.on('finish', () => {
    // Calculate how long it took
    const duration = Date.now() - start;

    // Colors for the terminal (Green 2xx, Yellow 4xx, Red 5xx)
    const colour =
      res.statusCode >= 500 ? '\x1b[31m' :
      res.statusCode >= 400 ? '\x1b[33m' :
                              '\x1b[32m';
    const reset = '\x1b[0m';

    // 3. Log the line
    console.log(
      `${colour}[${timestamp}] ${req.method.padEnd(6)} ${req.originalUrl} ` +
      `-> ${res.statusCode} (${duration}ms)${reset}`
    );
  });
  next();
};
