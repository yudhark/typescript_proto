import { NextFunction, Request, Response } from "express";

export interface ReturnFormat {
  success: boolean;
  message: string;
  data?: any;
}

function validate_siswa(req: Request, res: Response, next: NextFunction) {
  let { data } = req.body;
  let validitas_state: { isvalid: boolean; index?: number } = { isvalid: true };
  if (data instanceof Array) {
    for (let i = 0; i < data.length; i++) {
      if (Object.keys(data[i]).sort().join("") === "namepoints") {
        continue;
      } else {
        validitas_state.isvalid = false;
        validitas_state.index = i;
        break;
      }
    }
    const return_format: ReturnFormat = {
      success: false,
      message: "Invalid Format of Data at index: " + validitas_state.index,
    };
    if (validitas_state.isvalid) next();
    else return res.json(return_format);
  } else {
    const return_format: ReturnFormat = {
      success: false,
      message: "Invalid Format of Data",
    };
    return res.status(201).json(return_format);
  }
}

export { validate_siswa };
