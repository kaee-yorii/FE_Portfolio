import Joi from "joi";

const currentYear = new Date().getFullYear();

const isEducation = Joi.object({
    institutionName: isString100.required().label("Institution Name"),
    startYear: isYear.required().max(currentYear).label("Start Year"),
    endYear: isYear.min(Joi.ref('startYear')).max(currentYear).allow(null),
    major: isString100.allow(null, ''),
    degree: Joi.string().trim().min(2).max(100).allow(null, '')
})

export {
    isEducation
}