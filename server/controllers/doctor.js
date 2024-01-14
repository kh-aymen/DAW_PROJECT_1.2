import mongoose from "mongoose"
import Doctor from "../models/Doctor.js"
import User from "../models/User.js"
import Patient from "../models/Patient.js"

export const getDoctor = async (req, res) => {
    try {
        const doctortData = await Doctor.find()

        const doctortsWithUser = await Promise.all(
            doctortData.map(async (doctort) => {
                const user = await User.findById(doctort.User_id)
                return {
                    ...doctort.toObject(),
                    user: user.toObject(),
                }
            })
        )
        res.status(200).json(doctortsWithUser)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getOneDoctor = async (req, res) => {
    try {
        const { id } = req.params
        const objectId = mongoose.Types.ObjectId(id)


        const doctor = await Doctor.findOne({ User_id: objectId })

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' })
        }

        res.status(200).json(doctor)
    } catch (err) {
        console.error('Error:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}



export const updateAccess = async (req, res) => {
    try {
        var { data_access_value } = req.body
        const { id } = req.params
        const doctor = await Doctor.findById(id)
        doctor.data_access = !data_access_value
        await doctor.save()
        const result = doctor.data_access

        res.status(200).json({ result })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const addPatient = async (req, res) => {
    try {
        const { id, doctorID } = req.params

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }

        const objectId = mongoose.Types.ObjectId(doctorID)
        const doctor = await Doctor.findOne({ User_id: objectId })
        if (!doctor) {
            return res.status(404).json({ message: 'doctor not found' })
        }
        doctor.myPatient.push(user)
        await doctor.save()
        res.status(200).json({ doctor })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}


export const deleteDoctor = async (req, res) => {
    try {
        const { doctorId, userId } = req.body

        await User.findByIdAndDelete(userId)
        await Doctor.findByIdAndDelete(doctorId)


        res.status(200).json({ message: 'Doctor deleted successfully.' })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}


export const MyPatients = async (req, res) => {
    try {
        const { doctorID } = req.params
        const objectId = mongoose.Types.ObjectId(doctorID)
        const doctor = await Doctor.findOne({ User_id: objectId })

        if (doctor && doctor.myPatient && doctor.myPatient.length > 0) {
            doctor.myPatient = await Promise.all(
                doctor.myPatient.map(async (patient) => {
                    const userExists = await User.exists({ _id: patient })
                    return userExists ? patient : null
                })
            )

            doctor.myPatient = doctor.myPatient.filter((patient) => patient !== null)
        }

        res.status(200).json({ doctor })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}   