import { Router } from "express"
import * as controller from "../controllers/appController.js"
import * as middleware from "../middlewares/appMiddleware.js"
import * as mailer from "../mailer/mail.js"

const router = Router()

/** POST Methods */
router.post("/login", controller.login) // Login in app
router.post("/register", controller.register) // Register account
router.post("/registerMail", mailer.registerMail) // Send the mail register
router.post("/authenticate")
/** GET Methods */
router.get("/user/:username", middleware.authUser, controller.getUser) // Get info username
router.get(
  "/generateOTP",
  middleware.verifyUser,
  middleware.localVariable,
  controller.generateOTP,
) // Generate OTP
router.get("/verifyOTP", middleware.verifyUser, controller.verifyOTP) // Verify OTP
router.get("/createResetSession", controller.createResetSession) // Reset all variables
/** PUT Methods */
router.put("/updateuser/:username", middleware.authUser, controller.updateUser) // Update user
router.put("/resetPassword", middleware.verifyUser, controller.resetPassword) // Reset password

export default router
