import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import otpGenerator from "otp-generator"

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

/** GET http://localhost:8080/api/user/:username */
export const getUser = async (req, res) => {
  const { username } = req.params
  try {
    // If username === undefined
    if (!username)
      return res.status(404).json({ code: 1, error: "Please provide username" })
    // Find info username
    const user = await User.findOne({ username: username }).exec()
    // If not exist username
    if (!user) {
      return res.status(404).json({ code: 2, error: "User not exist" })
    } else {
      // Remove password from user
      const { password, ...rest } = Object.assign({}, user.toJSON())
      return res
        .status(200)
        .json({ code: 0, msg: "Get info user successfully", user: rest })
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}

/** PUT http://localhost:8080/api/updateuser/:username */
export const updateUser = async (req, res) => {
  const { username } = req.params
  const { name, phone, address } = req.body
  try {
    const newUser = await User.findOneAndUpdate(
      { username: username },
      { name, phone, address },
      { new: true },
    )
    if (!newUser) {
      return res.status(404).json({ code: 1, msg: "User not exist" })
    } else {
      return res.status(200).json({ code: 0, msg: "Update successfully" })
    }
  } catch (error) {
    return res.status(500).json({ code: 2, msg: "Can't update user" })
  }
}

/** GET http://localhost:8080/api/generateOTP */
export const generateOTP = async (req, res) => {
  req.app.locals.OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  })

  return res
    .status(200)
    .json({ code: req.app.locals.OTP, msg: "Generate OTP succesfully" })
}

/** GET http://localhost:8080/api/verifyOTP */
export const verifyOTP = async (req, res) => {
  const { code } = req.query
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null // Reset OTP value
    req.app.locals.resetSession = true // Start session for reset password
    return res.status(200).json({ code: 0, msg: "Verify successfully" })
  } else {
    return res.status(400).json({ code: 1, error: "Authentication Error" })
  }
}

/** GET http://localhost:8080/api/createResetSession */
export const createResetSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false
    return res.status(200).json({ msg: "Access granted" })
  } else {
    return res.status(440).json({ error: "Session expired" })
  }
}

/** PUT http://localhost:8080/api/resetPassword */
export const resetPassword = async (req, res) => {
  if (!req.app.locals.resetSession)
    return res.status(440).json({ code: 5, error: "Session expired" })
  try {
    const { username, password } = req.body
    // Find username
    try {
      const user = await User.findOne({ username: username }).exec()
      if (!user) {
        return res.status(404).json({ code: 1, error: "Not found user" })
      }
      // Create new hash password
      const hashedPassword = await bcrypt.hash(password, 10)
      // Update username with new password
      try {
        const result = await User.updateOne(
          { username: username },
          { password: hashedPassword },
        )
        req.app.locals.resetSession = false
        return res
          .status(200)
          .json({ code: 0, error: "Update new password successfully" })
      } catch (error) {
        return res
          .status(500)
          .json({ code: 2, error: "Some error when update new password" })
      }
    } catch (error) {
      return res
        .status(500)
        .json({ code: 3, error: "Something error when find username" })
    }
  } catch (error) {
    return res.status(401).json({ code: 4, error })
  }
}
