import { Request, Response } from "express";
import { ListCategoriesUseCase } from "../listCategories/ListCategoriesUseCase";
import { container } from "tsyringe";

class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const allCategories = await listCategoriesUseCase.execute();

    return res.json(allCategories);
  }
}

export { ListCategoriesController };
