const joi = require("joi");

const validation = joi.object({
    name: joi.string().alphanum().required(),
    email: joi.string().email().lowercase().required(),
    mobile: joi.number().min(10).required(),
    password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/).required(),
})

module.exports = {validation}