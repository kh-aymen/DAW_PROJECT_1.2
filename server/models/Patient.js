import mongoose from "mongoose"

const PatientSchema = mongoose.Schema(
    {
        User_id: {
            type: Object
        },
        addiction_level: {
            type: String,
        },
        average_Game_Hours_per_Week: {
            type: Number,
        },
        average_Game_Month: {
            type: Number,
        },
        score_Insomnia: {
            type: Number,
        },
        excessive_Drowsiness_score: {
            type: Number,
        },
        anxiety_score: {
            type: Number,
        },
        depression_score: {
            type: Number,
        }
    },
    { timestamps: true }
)

const Patient = mongoose.model("Patient", PatientSchema)
export default Patient