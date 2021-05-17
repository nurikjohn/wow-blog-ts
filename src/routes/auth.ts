import { Router } from "express"
import { AuthController } from "../controllers/auth"
import { AuthValidator } from "../validators/auth"

const router = Router({ mergeParams: true })
const controller = new AuthController()
const validator = new AuthValidator()

router.route("/login").post(validator.login, controller.login)
router.route("/signup").post(validator.signup, controller.signup)

export default router
