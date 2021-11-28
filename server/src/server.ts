import config from "config";
import App from "./application";
import logger from "./logger/logger";
const port = config.get<number>("port");

const server = new App().app;
server.listen(port, () => {
  logger.info(`Server is Running on Port ${port}`)
});
