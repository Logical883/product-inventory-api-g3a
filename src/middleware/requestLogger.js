// ============================================================
// REQUEST LOGGER (owner: S580-maker, branch: feature/error-handling)
// ------------------------------------------------------------
// Prints one line in the terminal for every request, which is great
// for debugging and for the live demo. Already connected in app.js.
//
// Right now it does nothing but pass the request along.
// YOUR TASK: log one line per request, like:
//     GET /api/products 200 3ms
//
// Hints:
//  - Remember the start time:  const start = Date.now();
//  - The status code is only known AFTER the response is sent, so use:
//      res.on('finish', () => { ...log here using res.statusCode... });
//  - Don't forget to call next()
// ============================================================
module.exports = (req, res, next) => {
  next();
};
