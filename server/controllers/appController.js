import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

/** POST http://localhost:8080/api/register */
export const register = async (req, res) => {
  try {
    const { username, password, name, phone, address, email } = req.body
    // Check existing user
    const existUsername = await User.findOne({ username: username }).exec()
    // If exist user
    if (existUsername) {
      return res
        .status(409)
        .json({ code: 1, error: "Please provide unique username" })
    }
    // If not exist user
    else {
      const existEmail = await User.findOne({ email: email }).exec()
      // If exist email
      if (existEmail) {
        res.status(409).json({ code: 2, error: "Please provide unique email" })
      }
      // If not exist email
      else {
        // Hash password and create user then save user
        bcrypt
          .hash(password, 10)
          .then((hashedPassword) => {
            const user = new User({
              username,
              password: hashedPassword,
              name,
              phone,
              address,
              email,
            })
            // Save user
            user
              .save()
              .then((result) => {
                return res
                  .status(201)
                  .json({ code: 0, msg: "Register successfully" })
              })
              .catch((error) => {
                return res.status(500).json({
                  code: 3,
                  error: "Error when save user to database",
                })
              })
          })
          .catch((error) => {
            return res
              .status(500)
              .json({ code: 4, error: "Enable to hashed password" })
          })
      }
    }
  } catch (error) {
    return res.status(500).json({ code: 5, error })
  }
}

/** POST http://localhost:8080/api/login */
export const login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username: username }).exec()
    // If not exist user
    if (!user) {
      return res.status(404).json({ code: 1, msg: "Account does not exist" })
    } else {
      // If exist user then compare password with user.password
      bcrypt
        .compare(password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            // If password incorrect
            return res.status(401).json({ code: 2, msg: "Incorrect Password" })
          } else {
            // Create token
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              process.env.JWT_KEY,
              { expiresIn: "4h" },
            )
            return res.status(200).json({
              code: 0,
              msg: "Login successfully",
              username: user.username,
              token,
            })
          }
        })
        .catch((error) => {
          return res
            .status(401)
            .json({ code: 3, msg: "Error when check password" })
        })
    }
  } catch (error) {
    return res.status(500).json({ code: 4, msg: "Error when login" })
  }
}
