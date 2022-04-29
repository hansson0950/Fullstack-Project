const Joi = require("@hapi/joi");

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(20).required(),
        email: Joi.string().max(50).required().email(),
        password: Joi.string().min(6).max(20).required()
    });
    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().max(50).required().email(),
        password: Joi.string().min(6).max(20).required()
    });
    return schema.validate(data);
};

const contactFormValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(20).required(),
        lastName: Joi.string().min(3).max(20).required(),
        email: Joi.string().max(50).required().email(),
        country: Joi.string().min(3).max(20).required(),
        message: Joi.string().required()
    });
    return schema.validate(data);
}

module.exports = {
    registerValidation,
    loginValidation,
    contactFormValidation
};