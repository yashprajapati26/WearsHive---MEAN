const joi = require("joi");

const userValidation = joi.object({
    name: joi.string().alphanum().required(),
    email: joi.string().email().lowercase().required(),
    mobile: joi.number().min(10).max(10).required(),
    password: joi.string().pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$").required(),
})

module.exports = {userValidation}