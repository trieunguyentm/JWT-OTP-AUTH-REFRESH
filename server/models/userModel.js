import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide unique username"],
    unique: [true, "Username exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
    unique: false,
  },
  phone: {
    type: String,
    required: [true, "Please provide phone number"],
    unique: false,
  },
  address: {
    type: String,
    required: [true, "Please provide address"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
})

const User = mongoose.model("User", userSchema)

export default User
