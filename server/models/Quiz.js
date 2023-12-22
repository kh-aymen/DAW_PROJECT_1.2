import mongoose from "mongoose"

const QuizSchema = mongoose.Schema(
    {
        Patient_id: {
            type: Object
        },
        date_of_Questionnaire: {
            type: Date,
        }
    },
    { timestamps: true }
)

const Quiz = mongoose.model("Quiz", QuizSchema)
export default Quiz