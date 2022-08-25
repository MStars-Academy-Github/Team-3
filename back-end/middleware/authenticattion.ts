import { NextFunction, Response, Request } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
const config = process.env;
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token;
  const tokenKey = config.TOKEN_KEY || "password";
  if (!token) {
    return res.status(403).json({
      success: false,
      data: "User token should be provided",
    });
  }
  try {
    const decoded = jwt.verify(token, tokenKey);
    req.body.email = decoded;
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }
  return next();
};

export default verifyToken;
