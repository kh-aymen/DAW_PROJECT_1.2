import express from "express"
import {
    getPatient,
    deletePatient
} from "../controllers/patient.js"

import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get('/', verifyToken, getPatient)
// router.get('/', getPatient)
router.post('/delete', verifyToken, deletePatient)


export default router