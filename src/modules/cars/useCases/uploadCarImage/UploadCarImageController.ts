import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
  filaname: string;
}

class UploadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const images = req.files as any | IFiles[];

    const uploadImageUseCase = container.resolve(UploadCarImageUseCase);

    const images_name = images.map((file) => file.filename);

    await uploadImageUseCase.execute({ car_id: id, images_name });

    return res.status(201).send();
  }
}

export { UploadCarImageController };
