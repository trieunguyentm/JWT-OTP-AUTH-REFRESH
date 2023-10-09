import { Router } from "express"
import * as controller from "../controllers/appController.js"

const router = Router()

/** POST Methods */
router.post("/register", controller.register)
router.post("/registerMail")
router.post("authenticate")
router.post("/login")
/** GET Methods */
router.get("/user/:username")
router.get("/generateOTP")
router.get("/verifyOTP")
router.get("/createResetSession")
/** PUT Methods */
router.put("/updateuser")
router.put("resetPassword")

export default router
