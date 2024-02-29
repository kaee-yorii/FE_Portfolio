import Joi from "joi";

const isExperience = Joi.object({
    company: isString100.required(),
    location: isString100,
    title: isString100,
    description: isString100
})

export {
    isExperience
}