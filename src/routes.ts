import { Router } from "express";
import { SendMailController } from "./controllers/SendMailontroller";
import { SurveyController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const surveysController = new SurveyController();
const sendMailController = new SendMailController();
router.post("/users", userController.store);
router.get("/index", userController.index);

router.post("/surveys", surveysController.store);
router.post("/sendMail", sendMailController.execute);
router.get("/show", surveysController.index);

export { router };
