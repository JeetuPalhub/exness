import express from "express";
import cors from "cors";

import { userMiddleware } from "./middleware/userMiddleware";
import { orderRouter } from "./router/orderRouter";

const app = express();

//Parse JSON body
app.use(express.json());

// Allow frontend requests
app.use(cors());

// Order routes (protected)
app.use("/order", userMiddleware, orderRouter);

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
