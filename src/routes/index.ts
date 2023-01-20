import { Express } from "express";
import {userRouter} from "./user.route";
import {twitterRouter} from "./twitter.route";
export function buildRoutes(app: Express) {
    app.use("/user", userRouter);
    app.use("/twitter", twitterRouter);
}
