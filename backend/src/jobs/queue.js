const { Queue } = require("bullmq");
const Redis = require("ioredis");

// Fallback configuration if Redis is not running
let emailQueue = null;
let redisClient = null;

try {
  // Initialize standard Redis client with low timeout to prevent server hanging if local Redis is down
  redisClient = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379", {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    connectTimeout: 800, 
  });

  redisClient.on("error", (err) => {
    // Suppress error messages from showing stack traces in development
  });

  emailQueue = new Queue("emailQueue", { connection: redisClient });
} catch (error) {
  console.warn("Could not connect to Redis. Running BullMQ in fallback (in-memory) mode.");
}

const addJob = async (name, data) => {
  // If connection is successful and status is ready
  if (emailQueue && redisClient && redisClient.status === "ready") {
    try {
      await emailQueue.add(name, data);
      console.log(`[Job Queue] Enqueued job: ${name} via BullMQ`);
      return;
    } catch (e) {
      // Log and proceed with memory fallback
    }
  }

  // Memory Fallback: Run immediately in an asynchronous callback
  console.log(`[Job Queue Fallback] Executing ${name} asynchronously in memory...`);
  const { processEmailJob } = require("./emailWorker");
  
  setTimeout(async () => {
    try {
      await processEmailJob({ data });
    } catch (err) {
      console.error(`[Job Queue Fallback] Error running job ${name}:`, err);
    }
  }, 0);
};

module.exports = { addJob };
