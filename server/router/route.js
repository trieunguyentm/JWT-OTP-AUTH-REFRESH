import { Router } from "express"
import * as controller from "../controllers/appController.js"
import { authUser } from "../middlewares/authUser.js"

const router = Router()

/** POST Methods */
router.post("/login", controller.login)
router.post("/register", controller.register)
router.post("/registerMail")
router.post("/authenticate")
/** GET Methods */
router.get("/user/:username", authUser, controller.getUser)
router.get("/generateOTP")
router.get("/verifyOTP")
router.get("/createResetSession")
/** PUT Methods */
router.put("/updateuser/:username", authUser, controller.updateUser)
router.put("/resetPassword")

export default router
