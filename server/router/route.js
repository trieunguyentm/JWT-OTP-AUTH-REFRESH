import { Router } from "express"
import * as controller from "../controllers/appController.js"
import * as middleware from "../middlewares/appMiddleware.js"

const router = Router()

/** POST Methods */
router.post("/login", controller.login)
router.post("/register", controller.register)
router.post("/registerMail")
router.post("/authenticate")
/** GET Methods */
router.get("/user/:username", middleware.authUser, controller.getUser)
router.get(
  "/generateOTP",
  middleware.verifyUser,
  middleware.localVariable,
  controller.generateOTP,
)
router.get("/verifyOTP", middleware.verifyUser, controller.verifyOTP)
router.get("/createResetSession")
/** PUT Methods */
router.put("/updateuser/:username", middleware.authUser, controller.updateUser)
router.put("/resetPassword")

export default router
