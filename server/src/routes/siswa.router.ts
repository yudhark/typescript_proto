import { validate_siswa } from "../middlewares/validate";
import { DummyController, SiswaController } from "../controllers";
import BaseRoutes from "./base.router";

class SiswaRouter extends BaseRoutes {
  routes(): void {
    this.router.post("/general", [validate_siswa], SiswaController.get_siswa);
    this.router.get("/dummy/:count", DummyController.index)
    this.router.get("/rates", DummyController.get_rates)
  }
}

export default new SiswaRouter().router;
