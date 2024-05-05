import { Request, Response } from "express";
import { CharacterBusiness } from "../business/businesCharater";
// exercicio 3
export class CharacterController {
  constructor(private characterBusiness: CharacterBusiness){ };

  public async performAttacke(req: Request, res: Response) {
    try {

    } catch (error:any) {
      const { statusCode, message } = error
      res.status(statusCode || 400).send({ message });
   }
  }

}