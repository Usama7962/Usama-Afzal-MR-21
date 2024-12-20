import express from 'express'
import { login,verify } from "../controllers/authControllers.js"
import authmiddleware from "../middleware/authmiddlware.js"



const router = express.Router()
router.post('/login',login)
router.get('/verify',authmiddleware,verify)

export default router;