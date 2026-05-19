/**
 * Shared test utilities — spins up an in-memory MongoDB instance per
 * test suite so tests are isolated, fast, and never touch a real database.
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

/**
 * Connect to a fresh in-memory MongoDB before all tests.
 */
const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

/**
 * Drop the entire database and close the connection after all tests.
 */
const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
};

/**
 * Clear every collection between tests for isolation.
 */
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

module.exports = { connect, disconnect, clearDatabase };
