import { validateEnvs } from "./validateEnvs.ts";
import { runBot } from "./bot/index.ts";
import * as dotenv from "dotenv";
import { connectDb } from "./mongodb/index.ts";
import runServer from "./server/app.ts";
dotenv.config();

const ENVS = process.env;
validateEnvs(ENVS);

const runApp = async () => {
  try {
    await connectDb()
      .then(() => {
        runBot();
        runServer();
      })
      .catch((error) => {
        console.error("error on connect " + error);
        // LOGGER.error(`[runApp][Error on connect db]`, {
        //   metadata: { error: error, stack: error.stack.toString() },
        // });
      });
  } catch (error) {
    // LOGGER.error(`[runApp][Error on run app]`, {
    //   metadata: { error: error, stack: error.stack.toString() },
    // });
  }
};

runApp();
