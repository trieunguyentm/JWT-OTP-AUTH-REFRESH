import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/userModel.js"

dotenv.config()

/** Verify username middle check exist username in db */
export const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method === "GET" ? req.query : req.body
    // Check user exist
    let user = await User.findOne({ username: username }).exec()
    // If user not exist
    if (!user) {
      return res.status(404).json({ error: "Username not exist" })
    }
    next()
  } catch (error) {
    return res.status(500).json({ error: "Authentication Error" })
  }
}

/** Auth middleware */
export const authUser = async (req, res, next) => {
  try {
    // Get username
    const { username } = req.params
    // Get Token (Authorization: Beared token)
    const token = req.headers.authorization.split(" ")[1]
    // If not provide token
    if (!token) {
      return res.status(404).json({ error: "Please provide token" })
    } else {
      // Decode token
      const decode = jwt.verify(token, process.env.JWT_KEY)
      // Check username in decode with username in params
      if (decode.username !== username)
        return res.status(401).json({ error: "Invalid Authentication" })
      else next()
    }
  } catch (error) {
    res.status(401).json({ error: "Authentication Failed" })
  }
}

/** Local variable middleware */
export const localVariable = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  }
  next()
}
