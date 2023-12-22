import mongoose from "mongoose"

const QuestionSchema = mongoose.Schema(
    {
        question_text: {
            type: String,
            required: true,
        },
        question_type: {
            type: String,
            required: true,
        },
        response_options: {
            type: Array,
            required: true,
        },
        points_awarded_the_question: {
            type: String,
        },
        order_display_in_the_questionnaire: {
            type: Number,
            required: true,
        },
        possible_question_dependencies: {
            type: String,
        }
    },
    { timestamps: true }
)

const Question = mongoose.model("Question", QuestionSchema)
export default Question