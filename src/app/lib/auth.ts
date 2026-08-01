import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db("CaseDesk");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },

      dateOfBirth: {
        type: "date",
        required: false,
      },

      userType: {
        type: "string",
        required: true,
        defaultValue: "general",
      },

      // Lawyer (Optional)
      barCouncilIdNo: {
        type: "string",
        required: false,
      },

      enrollmentDate: {
        type: "date",
        required: false,
      },

      // Lawyer Assistant (Optional)
      advocateClerkIdNo: {
        type: "string",
        required: false,
      },

      advocateId: {
        type: "string",
        required: false,
      },

      startedDate: {
        type: "date",
        required: false,
      },
    },
  },
});
