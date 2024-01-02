import express from "express"
import {
    getQustions,
    addQuestion,
    deleteOneQuestion,
    deleteTypeOfQuestions
} from "../controllers/qustion.js"

import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.get('/', verifyToken, getQustions)
router.post('/add', verifyToken, addQuestion)
router.delete('/deleteAll/:questionType', verifyToken, deleteTypeOfQuestions)
router.delete('/delete/:questionId', verifyToken, deleteOneQuestion)
// router.get('/', getQustions)
// router.post('/add', addQuestion)

export default router  