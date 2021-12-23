import { Request, Response } from "express";
import { build_data, flatten_html, get_rates } from "../services/rates.service";
import { generateRandomData } from "../services/dummy.service";
import fs from "fs";

class DummyController {
  index(req: Request, res: Response): Response {
    let count = Number(req.params.count);
    let data = generateRandomData(count);
    return res.status(200).json(data);
  }

  async get_rates(req: Request, res: Response) {
    try {
      const rates = await get_rates();
      var data = rates.data as string;
      const { headers, body } = flatten_html(data);
      const real_data = build_data(headers, body)
      return res.status(200).send(real_data);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
export default new DummyController();
