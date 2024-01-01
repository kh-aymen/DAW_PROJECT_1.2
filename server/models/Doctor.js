import mongoose from "mongoose"

const DoctorSchema = mongoose.Schema(
    {
        User_id: {
            type: Object
        },
        data_access: {
            type: Boolean,
            default: false,
        },
        speciality: {
            type: String,
        },
        scheduled_Therapy_sessions: {
            type: Number,
        },
        myPatient: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
)

const Doctor = mongoose.model("Doctor", DoctorSchema)
export default Doctor