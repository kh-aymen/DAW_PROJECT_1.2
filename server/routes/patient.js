import express from "express"
import {
    getPatient,
    deletePatient,
    addDoctor,
    getMyDoctor,
    getMyplansAndReviews,
    setMyplansAndReviews,
    setMyplansAndReviewsComment,
    setMyplansAndReviewsappointmentDate,
    getResult
} from "../controllers/patient.js"

import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get('/', verifyToken, getPatient)
// router.get('/', getPatient)
router.post('/delete', verifyToken, deletePatient)
router.get('/getMyDoctor/:id', verifyToken, getMyDoctor)
router.post('/addDoctor/:id', verifyToken, addDoctor)
// router.post('/addDoctor/:id', addDoctor)
router.get('/getMyplansAndReviews/:id', verifyToken, getMyplansAndReviews)
router.post('/setMyplansAndReviews/:id', verifyToken, setMyplansAndReviews)
router.post('/setMyplansAndReviews/comment/:id', verifyToken, setMyplansAndReviewsComment)
router.post('/setMyplansAndReviews/appointmentDate/:id', verifyToken, setMyplansAndReviewsappointmentDate)
router.get('/getResult/:id', verifyToken, getResult)


export default router