import Joi from "joi";

const envSchema: Joi.ObjectSchema = Joi.object({
    APP_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_DATABASE: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().allow('').optional(),
    DATABASE_URL: Joi.string().required()
}).unknown(true);

const {error, value: envVars} = envSchema.validate(process.env, {abortEarly: false});

if(error) {
    throw new Error(`Environment variable validation error: ${error.details[0].message}`);
}

export default envVars;