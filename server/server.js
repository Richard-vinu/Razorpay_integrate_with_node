import express from "express";
import { config } from "dotenv";
config({ path: "./config/config.env" });

import { connectDB } from "./config/database.js";
import subadminRouter from "./routes/subAdminRoute.js";
import Rolerouter from "./routes/roleRoute.js";
import superadminRouter from './routes/superAdminRoute.js'

export const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/superadmin", superadminRouter);
app.use("/api/subadmin", subadminRouter);
app.use("/api/role",Rolerouter)

app.get("/health", (req, res) => { 
  res.status(200).send("OK");
});

connectDB();


app.listen(process.env.PORT, () =>
  console.log(`Server is working on ${process.env.PORT}`)
);
