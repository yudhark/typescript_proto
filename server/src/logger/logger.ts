import { format, createLogger, transports, Logger } from "winston";
import config from "config";

// variable declaration
const { timestamp, combine, printf, errors, json } = format;
const env = config.get<any>("env");

function build_dev_logger(): Logger {
  const log_format = printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] ${level}: ${stack || message}`;
  });
  return createLogger({
    format: combine(
      format.colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      log_format
    ),
    defaultMeta: { sevice: "user-service" },
    transports: [new transports.Console()],
  });
}

function build_prod_logger(): Logger {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { sevice: "user-service" },
    transports: [new transports.Console()],
  });
}

let logger: Logger = build_dev_logger();
if (env.NODE_ENV === "development") {
  logger = build_dev_logger();
} else {
  logger = build_prod_logger();
}

export default logger;
