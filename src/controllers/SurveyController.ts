import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveysRepository";

class SurveyController {
  async store(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveyRepository);
    const survey = surveysRepository.create({
      title,
      description,
    });
    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  }

  async index(request: Request, response: Response) {
    const usersRepository = getCustomRepository(SurveyRepository);

    const all = await usersRepository.find();

    return response.json(all);
  }
}

export { SurveyController };
