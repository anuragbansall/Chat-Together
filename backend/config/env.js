import dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production.local"
      : ".env.development.local",
});

export const { PORT, MONGO_URI } = process.env;
