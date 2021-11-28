import { Request, Response } from "express";
import { SiswaInterface } from "src/services/siswa.service";
import { ObjectSiswa } from "../services";

class SiswaController {
  get_siswa(req: Request, res: Response): Response {
    let { data } = req.body;
    if (Array.isArray(data)) {
      let new_siswa: ObjectSiswa = new ObjectSiswa(data);
      return res.status(200).json({
        data: new_siswa,
        sort_by_name: new_siswa.sort_by_name("asc"),
        sort_by_points: {
          from_lowest: new_siswa.sort_by_points("lowest"),
          from_highest: new_siswa.sort_by_points("highest"),
        },
        average_by_siswa: new_siswa.average_points_siswa(),
      });
    } else {
      return res.send("Your Data is Not Array");
    }
  }
}

export default new SiswaController()
