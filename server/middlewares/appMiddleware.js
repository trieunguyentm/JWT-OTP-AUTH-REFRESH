import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

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
