import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("lessons_up");

export const auth = betterAuth({
  // ✅ এটা add করো
  trustedOrigins: [
    "http://localhost:3000",
    "https://lesson-up.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      plan: {
        type: "string",
        required: false,
        defaultValue: "Free",
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
      },
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});