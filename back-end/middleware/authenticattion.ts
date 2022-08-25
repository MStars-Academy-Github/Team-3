import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
const config = process.env;
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.body.token;
  const tokenKey = config.TOKEN_KEY || "password";
  if (!token) {
    return res.status(403).json({
      success: false,
      data: "User token should be provided",
    });
  }
  try {
    const decoded = jwt.verify(token, tokenKey);
    (req as CustomRequest).token = decoded;
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }
  return next();
};

export default verifyToken;
