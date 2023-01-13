import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";

import { buildRoutes } from "./routes";

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

buildRoutes(app);

app.listen(config.port, function () {
    console.log(`Listening on ${config.port}...`);
});
