const joi = require('joi');

const registerValidation = (data, i18n) => {
    const registerSchema = joi.object({
        name: joi
            .string()
            .min(6)
            .max(255)
            .required()
            .messages({
                'any.required': i18n.t('auth.name.error.required'),
                'string.min': i18n.t('auth.name.error.min'),
                'string.max': i18n.t('auth.name.error.max'),
            }),
        email: joi
            .string()
            .min(6)
            .max(255)
            .required()
            .email()
            .messages({
                'any.required': i18n.t('auth.email.error.required'),
                'string.min': i18n.t('auth.email.error.min'),
                'string.max': i18n.t('auth.email.error.max'),
                'string.email': i18n.t('auth.email.error.email'),
            }),
        password: joi
            .string()
            .min(6)
            .max(1024)
            .required()
            .messages({
                'any.required': i18n.t('auth.password.error.required'),
                'string.min': i18n.t('auth.password.error.min'),
                'string.max': i18n.t('auth.password.error.max'),
            }),
    });
    return registerSchema.validate(data);
};

const loginValidation = (data, i18n) => {
    const loginSchema = joi.object({
        email: joi
            .string()
            .min(6)
            .max(255)
            .required()
            .email()
            .messages({
                'any.required': i18n.t('auth.email.error.required'),
                'string.min': i18n.t('auth.email.error.min'),
                'string.max': i18n.t('auth.email.error.max'),
                'string.email': i18n.t('auth.email.error.email'),
            }),
        password: joi
            .string()
            .min(6)
            .max(1024)
            .required()
            .messages({
                'any.required': i18n.t('auth.password.error.required'),
                'string.min': i18n.t('auth.password.error.min'),
                'string.max': i18n.t('auth.password.error.max'),
            }),
    });
    return loginSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
