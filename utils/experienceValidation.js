import Joi from "joi";
import { isString100 } from "./mainValidation.js";

const isExperience = Joi.object({
    company: isString100.required().label('Company'),
    location: isString100.required().label('Location'),
    title: isString100.required().label('Title'),
    description: isText.required().label('Description'),
    startDate: Joi.date().less('now').required().label('start date'),
    endDate: Joi.date().less('now').allow(null).label('end date'),
})

export {
    isExperience
}