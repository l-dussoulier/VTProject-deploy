import { Express } from "express";
import {twitterDBRouter} from "./twitterDB.route";
import {userRouter} from "./user.route";
import {twitterRouter} from "./twitter.route";
export function buildRoutes(app: Express) {
    app.use("/twitterDB", twitterDBRouter);
    app.use("/user", userRouter);
    app.use("/twitter", twitterRouter);
}
