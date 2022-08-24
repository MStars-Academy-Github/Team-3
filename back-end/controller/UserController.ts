import Users from "../model/users";
import bcrypt from "bcryptjs";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const findExistingUser = await Users.find({ email: req.body });
  if (findExistingUser) {
    const userInterestData = await Users.find({
      hobby: { $regex: findExistingUser[0].hobby },
      sex: { $not: { $regex: findExistingUser[0].seekingFor } },
    });
    res.status(200).json({
      success: true,
      data: userInterestData,
    });
  }
};
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  console.log(body);
  const { firstName, lastName, age, sex, hobby, email, password, seekingFor } =
    req.body;
  console.log(lastName);
  const foundUser = await Users.findOne({
    firstName: firstName,
    lastName: lastName,
  });
  console.log(foundUser);
  if (foundUser) {
    res.json({
      success: false,
      data: "User allready exits",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const tokenKey = process.env.TOKEN_KEY || "password";
    const token = jwt.sign({ firstName: firstName }, tokenKey, {
      expiresIn: "2h",
    });
    console.log(hashedPassword);
    console.log(token);
    const createdUser = await Users.create({
      firstName,
      lastName,
      age,
      sex,
      hobby,
      email,
      hashedPassword,
      seekingFor,
    });
    if (createdUser) {
      res.json({
        success: true,
        message: "User creation was succesfully",
        data: createdUser,
        token: token,
      });
    } else {
      res.json({
        success: false,
        message: "User creation was unsuccess",
        data: {},
      });
    }
  }
};
const intrestUser = async (req: Request, res: Response, next: NextFunction) => {
  const { hobby } = req.body;
  const foundSimilarIntrest = await Users.findOne({ hobby: { $regex: hobby } });
  console.log(hobby);
  console.log(foundSimilarIntrest);
  if (foundSimilarIntrest) {
    res.json({
      success: true,
      data: foundSimilarIntrest,
    });
  }
};
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.body;
    console.log(params);
    if (Object.values(params).length === 0) {
      res.status(400).json({
        success: false,
        message: "No user data provided",
      });
    }
    const { email, password } = params;
    const findExistingUser = await Users.find({ email: email });

    if (findExistingUser.length === 0) {
      res.status(400).json({
        success: false,
        message: "User data doesn't exit",
      });
    }
    if (
      await bcrypt.compare(
        password,
        findExistingUser ? findExistingUser[0].hashedPassword : "thisidnotValid"
      )
    ) {
      const tokenKey = process.env.TOKEN_KEY || "password";
      const token = jwt.sign(
        { firstName: findExistingUser[0].firstName },
        tokenKey,
        { expiresIn: "2h" }
      );
      const userInterestData = await Users.find({
        hobby: { $regex: findExistingUser[0].hobby },
        sex: { $not: { $regex: findExistingUser[0].seekingFor } },
      });
      res.status(200).json({
        success: true,
        data: userInterestData,
        token: token,
      });
    } else {
      res.status(401).json({
        success: false,
        data: "Хэрэглэгчийн мэдээллээ зөв оруулна уу",
      });
    }
  } catch (err: any) {
    console.log(err.message);
    next(err);
  }
};
export default { getUsers, createUser, intrestUser, loginUser };
