import Joi from "joi";
import { isString100, isText, isURI, isEmail } from './mainValidation.js'

export const isUpdateProfile = Joi.object({
    email: isEmail,
    firstName: isString100,
    lastName: isString100,
    dob: Joi.date().less('now'),
    phone: isString100,
    job: isString100,
    address: isText,
    city: isString100,
    country: isString100,
    bio: isText,
    website: isURI,
    github: isURI,
    instagram: isURI,
    facebook: isURI,
    twitter: isURI,
    linkedin: isURI,
    discord: isURI,
});