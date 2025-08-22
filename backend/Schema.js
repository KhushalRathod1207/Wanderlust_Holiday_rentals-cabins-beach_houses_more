const Joi = require("joi");

// Listing validation schema
module.exports.Joi_listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.string().allow("", null) // optional
    }).required()
});

// Review validation schema
module.exports.Joi_reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required()
    }).required()
});
