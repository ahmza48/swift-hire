import mongoose from "mongoose";

/**
 * Serverless-friendly Mongoose connection cache.
 *
 * Vercel spins new lambda instances per request; without caching we would open
 * a fresh MongoDB connection every invocation and blow through Atlas's pool.
 * This pattern keeps one connection alive per warm lambda instance across
 * requests, and reuses the in-flight promise if a second request arrives
 * before the first has finished connecting.
 */
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {

  var __adminMongoose: MongooseCache | undefined;
}

const cached: MongooseCache =
  global.__adminMongoose ?? { conn: null, promise: null };

if (!global.__adminMongoose) {
  global.__adminMongoose = cached;
}

export async function connectAdminDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Configure it in .env.local (dev) and Vercel Project Settings (prod).",
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        // Fail fast in serverless — a long hang would burn lambda time.
        serverSelectionTimeoutMS: 8000,
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
