import { validate_siswa } from "../middlewares/validate";
import { SiswaController } from "../controllers";
import BaseRoutes from "./base.router";

class SiswaRouter extends BaseRoutes {
  routes(): void {
    this.router.post("/general", [validate_siswa], SiswaController.get_siswa);
  }
}

export default new SiswaRouter().router;
