import Users from "../model/users";
import express, { NextFunction, Request, Response } from "express";
const getUsers = (req: Request, res: Response, next: NextFunction) => {
  Users.find({}, (err: Error, data: any) => {
    if (err) {
      return err;
    }
    res.json({
      data: data,
    });
  });
};
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const { firstName, lastName, age, sex, hobby } = req.body;
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
    const createdUser = await Users.create({
      firstName,
      lastName,
      age,
      sex,
      hobby,
    });
    if (createdUser) {
      res.json({
        success: true,
        message: "User creation was succesfully",
        data: createdUser,
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
export default { getUsers, createUser };
