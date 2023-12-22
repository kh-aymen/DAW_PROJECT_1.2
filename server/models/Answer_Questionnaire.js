import mongoose from "mongoose"

const Answer_QuestionnaireSchema = mongoose.Schema(
    {
        Quiz_id: {
            type: Object
        },
        Question_id: {
            type: Object
        },
        answer_the_question: {
            type: String,
        },
        score_attributes_the_response: {
            type: Number,
        },
        comments_on_the_answer: {
            type: String,
        }
    },
    { timestamps: true }
)

const Answer_Questionnaire = mongoose.model("Answer_Questionnaire", Answer_QuestionnaireSchema)
export default Answer_Questionnaire