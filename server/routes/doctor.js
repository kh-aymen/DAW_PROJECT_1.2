import express from "express"
import {
    getDoctor,
    deleteDoctor
} from "../controllers/doctor.js"

import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get('/', verifyToken, getDoctor)
// router.get('/', getDoctor)
router.post('/delete', verifyToken, deleteDoctor)



export default router