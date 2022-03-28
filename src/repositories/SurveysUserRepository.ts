import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/UsersSurvey";

@EntityRepository(SurveyUser)
class SurveysUserRepository extends Repository<SurveyUser> {}

export { SurveysUserRepository };
