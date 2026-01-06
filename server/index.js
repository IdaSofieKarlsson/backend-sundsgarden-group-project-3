import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("We are connected to MongoDB!"))
.catch((err) => console.error("Failed to connect to MongoDB", err));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
