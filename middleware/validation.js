const logger = require('../utils/logger');

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            logger.warn("Validation error:", { data: error.details });
            return res.status(400).json({
                error: "Validation error",
                details: error.details.map((detail) => detail.message),
            });
        }
        next();
    };
};

module.exports = validateRequest;
