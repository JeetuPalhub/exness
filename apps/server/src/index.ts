import dotenv from "dotenv";
dotenv.config();  // loads app/server/ .env

import express from "express";
import Cors from "cors";

import { connectRedis } from "./connectedredis"; // ensure this path points to your connected redis file
// Use default import because your route file exports default router
import candlesRoute from "./router/candles";       // <-- make sure this path matches your file (router vs routes)
import { userMiddleware } from "./middleware/userMiddleware";
import { orderRouter } from "./router/orderRouter";
import { userRouter } from "./router/userRouter";


const app = express();

//Parse JSON body
app.use(express.json());

// Allow frontend requests
app.use(Cors());

app.use("/api/v1/candles", candlesRoute);

app.use("/api/v1/user", userRouter);

// Order routes (protected)
app.use("/api/v1/order", userMiddleware, orderRouter);

const PORT = Number(process.env.PORT ?? 4000);

(async () => {
  try {
    // ensure redis is connected before accepting requests
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();