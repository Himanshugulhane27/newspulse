// thinking about API versioning for future
// this would let us run v1 and v2 endpoints simultaneously
const express = require('express');
const createVersionedRouter = (version) => {
  const router = express.Router();
  router.use((req, res, next) => {
    req.apiVersion = version;
    res.setHeader('X-API-Version', version);
    next();
  });
  return router;
};
// usage example (not active):
// const v1Router = createVersionedRouter('v1');
// const v2Router = createVersionedRouter('v2');
// app.use('/api/v1', v1Router);
// app.use('/api/v2', v2Router);
module.exports = { createVersionedRouter };
