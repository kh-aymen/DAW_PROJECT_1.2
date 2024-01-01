import express from "express"
import {
    getDoctor,
    deleteDoctor,
    updateAccess,
    getOneDoctor,
    addPatient,
    MyPatients
} from "../controllers/doctor.js"

import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get('/', verifyToken, getDoctor)
router.get('/getone/:id', verifyToken, getOneDoctor)
// router.get('/', getDoctor)
router.post('/delete', verifyToken, deleteDoctor)
router.post('/access/:id', verifyToken, updateAccess)
router.post('/addPatient/:id/:doctorID', verifyToken, addPatient)
router.get('/MyPatients/:doctorID', verifyToken, MyPatients)



export default router