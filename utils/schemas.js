const Joi = require('joi');

const reportSchema = Joi.object({
    description: Joi.string().max(500).optional(),
    address: Joi.string().max(255).optional(),
    location: Joi.object({
        type: Joi.string().valid('Point').required(),
        coordinates: Joi.array().items(Joi.number()).length(2).required(),
    }).required(),
    // Explicitly disallow other fields to prevent mass assignment at the validation level too
    active: Joi.forbidden(),
    timestamp: Joi.forbidden(),
});

module.exports = {
    reportSchema,
};
