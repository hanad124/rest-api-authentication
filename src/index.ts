import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import router from "./router";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;

server.listen(8080, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

// // check if connection with the database is successful
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

// // check if connection with the database is unsuccessful
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

app.use("/", router());
