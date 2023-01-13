import { Express } from "express";
import {twitterRouter} from "./player.route";
export function buildRoutes(app: Express) {
    app.use("/twitter", twitterRouter);
}
