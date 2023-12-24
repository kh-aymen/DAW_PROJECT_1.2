import express from "express"
import {
  getUser,
  updatePersonalInfoForm,
  updateLocationAndOccupation
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

/* READ */
router.get("/:id", verifyToken, getUser)
router.post("/updatePersonalInfoForm/:id", verifyToken, updatePersonalInfoForm)
router.post("/updateLocationAndOccupation/:id", verifyToken, updateLocationAndOccupation)


export default router
