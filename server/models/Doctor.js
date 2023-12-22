import mongoose from "mongoose"

const DoctorSchema = mongoose.Schema(
    {
        User_id: {
            type: Object
        },
        speciality: {
            type: String,
        },
        scheduled_Therapy_sessions: {
            type: Number,
        },
    },
    { timestamps: true }
)

const Doctor = mongoose.model("Doctor", DoctorSchema)
export default Doctor