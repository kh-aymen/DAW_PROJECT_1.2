import Question from "../models/Question.js"

export const addQuestion = async (req, res) => {
    try {
        const {
            question_text,
            question_type,
            response_options,
            order_display_in_the_questionnaire,
        } = req.body;

        const newQuestion = new Question({
            question_text,
            question_type,
            response_options,
            order_display_in_the_questionnaire,
        });

        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getQustions = async (req, res) => {
    try {
        const QuestionData = await Question.find()
        res.status(200).json(QuestionData)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteOneQuestion = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        const deletedQuestion = await Question.findByIdAndDelete(questionId);
        if (deletedQuestion) {
            res.status(200).json({ message: `Question with ID ${questionId} deleted successfully.` });
        } else {
            res.status(404).json({ message: `Question with ID ${questionId} not found.` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const deleteTypeOfQuestions = async (req, res) => {
    try {
        const questionType = req.params.questionType;
        await Question.deleteMany({ question_type: questionType });
        res.status(200).json({ message: `All questions of type ${questionType} deleted successfully.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}