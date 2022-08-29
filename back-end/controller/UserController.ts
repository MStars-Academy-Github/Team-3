import Users from "../model/users";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.params.email;

  const findExistingUser = await Users.find({ email: email });

  if (findExistingUser) {
    const randomAggergate = await Users.aggregate([
      {
        $match: {
          email: { $nin: findExistingUser[0].interest },
        },
      },
      { $match: { sex: { $in: [findExistingUser[0].seekingFor] } } },
      { $sample: { size: 1 } },
    ]);
    console.log(randomAggergate);
    res.status(200).json({
      success: true,
      data: randomAggergate,
    });
  }
};
const notFilerting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { interest, id } = req.body;

  try {
    await Users.updateOne({ _id: id }, { $push: { interest: interest } });
    res.status(200).json({
      success: true,
      message: "Амжилттай",
    });
    next();
  } catch (err) {
    console.log(err);
  }
};
const likedUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, age, id } = req.body;

  try {
    await Users.updateOne(
      { _id: id },
      { $push: { liked: { name: name, email: email, age: age } } }
    );
    res.status(200).json({
      success: true,
      message: "Амжилттай боллоо",
    });
    next();
  } catch (err) {
    console.error(err);
  }
};
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    firstName,
    lastName,
    age,
    sex,
    hobby,
    email,
    password,
    seekingFor,
    imgURL,
  } = req.body;

  const foundUser = await Users.findOne({
    firstName: firstName,
    lastName: lastName,
  });

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

    const createdUser = await Users.create({
      firstName,
      lastName,
      age,
      sex,
      hobby,
      email,
      hashedPassword,
      seekingFor,
      imgURL,
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

      res.status(200).json({
        success: true,
        token: token,
        email: findExistingUser[0].email,
        id: findExistingUser[0]._id,
        name: findExistingUser[0].firstName,
        age: findExistingUser[0].age,
        message: "Амжилттай нэвтэрлээ",
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
export default { getUsers, createUser, loginUser, notFilerting, likedUser };
