"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.userValidationRules = void 0;
const express_validator_1 = require("express-validator");
const userValidationRules = () => {
    return [
        (0, express_validator_1.body)("email").isEmail(),
        (0, express_validator_1.body)("password").isLength({ min: 6, max: 8 }),
    ];
};
exports.userValidationRules = userValidationRules;
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    console.log(errors);
    if (errors.isEmpty()) {
        next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({
        errors: extractedErrors,
    });
};
exports.validate = validate;
// module.exports = { userValidationRules, validate };
