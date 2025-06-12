const { redisClient } = require("../utils/redisClient");

// Middleware to check cache before DB
const checkCache = (keyPrefix) => async (req, res, next) => {
  try {
    const cachedData = await redisClient.get(keyPrefix);
    if (cachedData) {
      console.log(`[CACHE HIT] Key: ${keyPrefix}`);
      return res.status(200).json(JSON.parse(cachedData));
    }
    console.log(`[CACHE MISS] Key: ${keyPrefix}`);
    // Pass to controller if not cached
    next();
  } catch (err) {
    console.error(`[REDIS ERROR on GET] Key: ${keyPrefix}`, err);
    next(); // Allow fallback to DB
  }
};

// Middleware to set data to cache after response
const cacheResponse = (keyPrefix) => async (req, res, next) => {
  const originalSend = res.json;
  res.json = async (body) => {
    try {
      await redisClient.set(keyPrefix, JSON.stringify(body), {
        EX: 60 * 10, // cache for 10 minutes
      });
      console.log(`[CACHE SET] Key: ${keyPrefix}`);
    } catch (err) {
      console.error(`[REDIS ERROR on SET] Key: ${keyPrefix}`, err);
    }
    return originalSend.call(res, body);
  };
  next();
};

module.exports = { checkCache, cacheResponse };
