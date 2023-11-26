import express from "express";
import { login, register } from "../controllers/user.js";
 const router = express.Router();

//user
router.post('/Register', register);
router.post('/Login', login);




 export default router;