import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./utils/ConnectDb.js";
import { mongoURL, port } from "./utils/dev.env.js";
import watchList from "./controllers/watchlist.controller.js";
import path from "path";
import priceNotification from "./controllers/notification.controller.js";
import "./croneJob.js";
import { fileURLToPath } from 'url';
import stockApi from "./controllers/stockapi.controller.js"
import users from "./controllers/user.controller.js";
const app = express();
const key = mongoURL;

// ES module solution for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDb(key);
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Serve static files from the .next folder
// app.use(express.static(path.join(__dirname, '.next')));

app.use("/api/watchlist", watchList);
app.use("/api/notification", priceNotification);
app.use("/api/wallofstreet/", stockApi);
app.use("/api/user/", users);

// Catch-all route to serve index.html for any route not matched by API routes
// app.get('*', (req, res) => {
//   return res.sendFile(path.join(__dirname, '.next', 'index.html'));
// });

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
