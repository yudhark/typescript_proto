import { Request, Response } from "express";
interface IController {
  retrieve(req: Request, res: Response): Response;
  insert(req: Request, res: Response): Response;
  get(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  delete(req: Request, res: Response): Response;
}

export default IController;
