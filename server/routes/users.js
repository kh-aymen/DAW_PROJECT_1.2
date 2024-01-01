import express from "express"
import {
  getUser,
  updatePersonalInfoForm,
  updateLocationAndOccupation,
  addTestResulte,
  restResulte,
  setDoctor,
  removeDoctor
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

/* READ */
router.get("/:id", verifyToken, getUser)
router.post("/updatePersonalInfoForm/:id", verifyToken, updatePersonalInfoForm)
router.post("/updateLocationAndOccupation/:id", verifyToken, updateLocationAndOccupation)
router.post("/addTestResulte/:id", verifyToken, addTestResulte)
router.get("/restResulte/:id", verifyToken, restResulte)
router.get("/setDoctor/:id", verifyToken, setDoctor)
router.get("/removeDoctor/:id", verifyToken, removeDoctor)


export default router
