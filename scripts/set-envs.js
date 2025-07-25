const { writeFileSync, mkdirSync } = require("fs");

require("dotenv").config();

const targetPath = "./src/environments/environment.ts";
const targetPathDev = "./src/environments/environment.development.ts";

const openweatherKey = process.env["OPENWEATHER_KEY"];

if (!openweatherKey) {
  throw new Error("OPENWEATHER_KEY is not set");
}

const envFileContent = `
export const environment = {
  openweatherkey:
  "${openweatherKey}"
}
`;

mkdirSync("./src/environments", { recursive: true });

writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
