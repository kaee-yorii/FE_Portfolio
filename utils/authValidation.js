import Joi from "joi";

const isEmail = Joi.string().email({
    tlds: {
        allow: false
    }
}).max(100).trim();
const isPassword = Joi.string().min(6).max(100).trim();
const isString = Joi.string().min(3).max(100).trim()


export const loginValidation = Joi.object({
    email: isEmail.required().label("Email"),
    password: isPassword.required().label("Password")
});

export const updateUserValidation = Joi.object({
    name: isString.label("Name").required(),
    email: isEmail.label("Email").required(),
    current_password: isPassword.label("Old Password").required(),
    password: isPassword.label("New Password").required(),
    confirm_password: isPassword.required()
        .valid(Joi.ref('Confirm New Password'))
        .label("Password")
        .options({
            messages: {
                'any.only': '{{#label}} not match'
            }
        })
});