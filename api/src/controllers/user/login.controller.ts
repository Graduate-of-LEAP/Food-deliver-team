import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";
const jwt = require("jsonwebtoken");

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  const user = await userModel.findOne({ email, password });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
    process.env.JWT_SECRET as string
  );

  return res.status(200).json({
    token,
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
  });
};

export { login };
