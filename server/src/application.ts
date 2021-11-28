import express, { Application, Request, Response } from "express";
import config from "config";
import compression from "compression";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";
import { siswa_router } from "./routes";
// Routers import

// variabel declaration
const base_url = config.get<string>("api_path");
const options = config.get<CorsOptions>("cors_options");

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors(options));
    this.app.use(compression());
    this.app.use(helmet());
  }

  protected routes(): void {
    // list of partial routers
    this.app.route("/").get((req: Request, res: Response) => res.send("OK"));
    this.app.use(`${base_url}/siswa`, siswa_router)

    // last of line
    this.app
      .route("*")
      .all((req: Request, res: Response) => res.status(404).send("Not Found!")); // last of routes line
  }
}

export default App;
