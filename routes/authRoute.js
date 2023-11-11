import express, { Router }  from "express";
import { registerController,loginController,testController} from "../controllers/authController.js";
import { isAdmin, requireSingnIn } from "../middlewares/authMiddleware.js";
// Router
const router = express.Router();

// register || method post
router.post('/register', registerController);

//login
// post
router.post('/login', loginController)

// test rout
router.get('/test', requireSingnIn, isAdmin, testController)

export default router;