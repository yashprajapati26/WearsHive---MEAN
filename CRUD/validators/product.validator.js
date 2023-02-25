const joi = require("joi");

const validation = joi.object({
    title : joi.string().min(3).max(30).required(),
    price : joi.number().required(),
    qty : joi.number().required(),
    category : joi.required(),
    image : joi.required(),
    detailUrl : joi.string().min(5).max(500).required()
})

module.exports = {validation}