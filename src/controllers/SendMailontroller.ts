import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveysRepository";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";
import { UsersRepository } from "../repositories/UserRepository";
import { Request, Response } from "express";
import SendEmailService from "../services/SendEmailService";
import { resolve } from "path";
import { env } from "process";

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, surveys_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveyRepository);
    const surveysUserRepository = getCustomRepository(SurveysUserRepository);

    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      return response.status(400).json({
        error: "Usuário não existe.",
      });
    }

    const surveys = await surveysRepository.findOne({
      id: surveys_id,
    });

    if (!surveys) {
      return response.status(400).json({
        error: "Pesquisa não existe.",
      });
    }

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const variables = {
      name: user.name,
      title: surveys.title,
      description: surveys.description,
      user_id: user.id,
      link: process.env.URL_MAIL,
    };

    const surveyUserAlreadyExists = await surveysUserRepository.findOne({
      where: [{ user_id: user.id }, { value: null }],
      relations: ["user", "survey"],
    });

    if (surveyUserAlreadyExists) {
      await SendEmailService.execute(email, surveys.title, variables, npsPath);
      return response.json(surveyUserAlreadyExists);
    }

    const surveyUser = await surveysUserRepository.create({
      user_id: user.id,
      surveys_id,
    });
    await surveysUserRepository.save(surveyUser);

    await SendEmailService.execute(email, surveys.title, variables, npsPath);

    return response.status(201).json(surveyUser);
  }
}

export { SendMailController };
