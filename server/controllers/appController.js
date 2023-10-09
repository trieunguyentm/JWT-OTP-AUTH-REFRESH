import User from "../models/userModel.js"
import bcrypt from "bcrypt"

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
