import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
Book;
import booksRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();
//Middleware for parsing reques body
app.use(express.json());

//Middleware for CORS POLICY
//Option 1: Allow All Origins with Defalt of cors(*)
app.use(cors());

//Option 1: Allow Custom
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
//Middleware for bookRoute

app.use("/books", booksRoute);

app.get("/", (req, res) => {
  return res.status(234).send("Welcome to MERN");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to db");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
