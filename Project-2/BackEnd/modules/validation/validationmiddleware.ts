import { NextFunction,Request,Response } from "express";

import { body, validationResult } from "express-validator";

export const userValidationRules = () => {
  return [
    body("email").isEmail(),
    body("password").isLength({ min: 6, max: 8 }),
  ];
};

export const validate = (req:Request, res:Response, next:NextFunction) => {
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
    next();
  }

  const extractedErrors: { [x: number]: any; }[] = [];
  errors.array().map((err: { param: any; msg: any; }) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

// module.exports = { userValidationRules, validate };
