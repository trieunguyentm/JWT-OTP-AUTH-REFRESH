import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connect = async () => {
  const db = await mongoose.connect(
    process.env.DB || "mongodb://127.0.0.1:27017/otp-jwt-auth-app",
  )
  console.log("Connected to MongoDB")
  return db
}

export default connect
