import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
