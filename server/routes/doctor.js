import express from "express"
import {
    getDoctor,
    deleteDoctor,
    updateAccess
} from "../controllers/doctor.js"

import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get('/', verifyToken, getDoctor)
// router.get('/', getDoctor)
router.post('/delete', verifyToken, deleteDoctor)
router.post('/access/:id', verifyToken, updateAccess)



export default router