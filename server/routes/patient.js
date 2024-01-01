import express from "express"
import {
    getPatient,
    deletePatient,
    addDoctor,
    getMyDoctor
} from "../controllers/patient.js"

import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get('/', verifyToken, getPatient)
// router.get('/', getPatient)
router.post('/delete', verifyToken, deletePatient)
router.get('/getMyDoctor/:id', verifyToken, getMyDoctor)
router.post('/addDoctor/:id', verifyToken, addDoctor)
// router.post('/addDoctor/:id', addDoctor)


export default router