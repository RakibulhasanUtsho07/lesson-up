import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { jwt } from "better-auth/plugins";
const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("lessons_up");
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      plan: {
        type: "string",
        required: false, // আপনি চাইলে এটিকে true-ও করতে পারেন
        defaultValue: "Free", // ক্লায়েন্ট থেকে ডাটা না আসলেও ডিফল্ট "Free" সেভ হবে
      },
      role: {
        type: "string",
        required: false, // আপনি চাইলে এটিকে true-ও করতে পারেন
        defaultValue: "user", // ক্লায়েন্ট থেকে ডাটা না আসলেও ডিফল্ট "Free" সেভ হবে
      },
    },
  },
  //    user:{
  //     update:{
  //       enabled: true,

  //     }
  //   },
  //   socialProviders:{
  //     google:{
  //       clientId: process.env.GOOGLE_CLIENT_URI || "http://localhost:3000",
  //       clientSecret :process.env.GOOGLE_CLIENT_SECRET || "http://localhost:3000",
  //     }
  //   },

  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
});
