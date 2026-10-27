// REQUEST LOGGER (owner: S580-maker, branch: feature/error-handling)

module.exports = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const colour =
      res.statusCode >= 500 ? '\x1b[31m' :
      res.statusCode >= 400 ? '\x1b[33m' :
                              '\x1b[32m';
    const reset = '\x1b[0m';

    console.log(
      `${colour}[${timestamp}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)${reset}`
    );
  });

  next();
};
