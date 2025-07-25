import dotenv from "dotenv";
import path from "path";
import fs from "fs";

async function globalSetup(): Promise<void> {
  try {
    if (process.env.ENV) {
      const envFile = `.env.${process.env.ENV}`;
      const envPath = path.resolve(__dirname, "../../config", envFile);

      if (!fs.existsSync(envPath)) {
        throw new Error(
          `The environment file '${envFile}' doesn't exists in the path '${envPath}'.`
        );
      }

      dotenv.config({
        path: envPath,
        override: true,
      });
    }
  } catch (error) {
    console.error("Error in loading environment variables", error);
    process.exit(1); //Stop the process if there's an error and the file doesn't exist
  }
}

export default globalSetup;
