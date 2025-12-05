import { initializeDatabase } from "./db/schema"; 
import express from "express";
import Cors from "cors";
import { connectredis } from "./db/connectToRedis";
import { userMiddleware } from "./middleware/userMiddleware";
import { orderRouter } from "./router/orderRouter";
import { userRouter } from "./router/userRouter.js";
import { getCandlesData } from "./router/candles";

const app = express();

//Parse JSON body
app.use(express.json());

// Allow frontend requests
app.use(Cors());

app.use("/api/v1/candles", getCandlesData);

app.use("/api/v1/user", userRouter);

// Order routes (protected)
app.use("api/v1/order", userMiddleware, orderRouter);

(async () => {
    await initializeDatabase();
    await connectredis();

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
})();
