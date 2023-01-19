import { Express } from "express";
import {twitterRouter} from "./player.route";
import {userRouter} from "./user.route";
export function buildRoutes(app: Express) {
    app.use("/twitter", twitterRouter);
    app.use("/user", userRouter);
}
