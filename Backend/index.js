import "dotenv/config";
import express from "express";
import cors from "cors";

import userRouter from "./routes/user.route.js";
import urlRouter from "./routes/url.route.js";
import { authenticationMiddleware } from "./middlewares/auth.middleware.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

//cors
app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN,     // dev
      "https://shorty.app",         // prod frontend
      "https://www.shorty.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,    
  })
);

/**
 *  JSON middleware
 */
app.use(express.json());

/**
 *  Auth middleware
 */
app.use(authenticationMiddleware);

app.get("/", (req, res) => {
  res.json({ status: "server is up and running" });
});

app.use("/user", userRouter);
app.use(urlRouter);

app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
});
