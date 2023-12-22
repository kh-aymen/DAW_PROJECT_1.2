import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import FlexBetween from "./FlexBetween";

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [deleteType, setDeleteType] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const token = useSelector((state) => state.token);

    const { palette } = useTheme();
    const primaryDark = palette.primary.dark;

    const getQuestions = async () => {
        try {
            const response = await fetch("http://localhost:3001/question", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    useEffect(() => {
        getQuestions();
    }, [token]);

    const handleOpenDialog = (type, question) => {
        setDeleteType(type);
        setSelectedQuestion(question);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDeleteType(null);
        setSelectedQuestion(null);
        setDialogOpen(false);
    };

    const handleConfirmDeleteAll = async (questionType) => {
        try {
            const response = await fetch(`http://localhost:3001/question/deleteAll/${questionType}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                console.log(`All questions of type ${questionType} deleted successfully.`);
                getQuestions();
            } else {
                console.error(`Failed to delete all questions of type ${questionType}`);
            }
        } catch (error) {
            console.error("Error deleting all questions:", error);
        }
        handleCloseDialog();
    };

    const handleConfirmDeleteQuestion = async (questionId) => {
        try {
            const response = await fetch(`http://localhost:3001/question/delete/${questionId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                console.log(`Question with ID ${questionId} deleted successfully.`);
                getQuestions();
            } else {
                console.error(`Failed to delete question with ID ${questionId}`);
            }
        } catch (error) {
            console.error("Error deleting question:", error);
        }
        handleCloseDialog();
    };

    const groupedQuestions = questions.reduce((acc, question) => {
        if (!acc[question.question_type]) {
            acc[question.question_type] = [];
        }
        acc[question.question_type].push(question);
        return acc;
    }, {});

    const sortedQuestionTypes = Object.keys(groupedQuestions).sort();

    return (
        <Box>
            {sortedQuestionTypes.map((questionType) => (
                <Accordion key={questionType} sx={{ backgroundColor: "#1010" }}>
                    <AccordionSummary sx={{ width: '100%' }}>
                        <FlexBetween sx={{ width: '100%' }}>
                            <Typography>
                                {questionType} ({groupedQuestions[questionType].length} questions)
                            </Typography>
                            <IconButton
                                onClick={() => handleOpenDialog(questionType, null)}
                                sx={{ p: "0.3rem" }}
                            >
                                <DeleteOutlineOutlined color="error" />
                            </IconButton>
                        </FlexBetween>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box>
                            {groupedQuestions[questionType].map((question) => (
                                <Accordion key={question._id}>
                                    <AccordionSummary sx={{ width: '100%' }}>
                                        <FlexBetween sx={{ width: '100%' }}>
                                            <Typography>{question.question_text}</Typography>
                                            <IconButton
                                                onClick={() => handleOpenDialog(null, question._id)}
                                                sx={{ p: "0.2rem" }}
                                            >
                                                <DeleteOutlineOutlined
                                                    sx={{ color: primaryDark, width: '20px', height: '20px' }}
                                                />
                                            </IconButton>
                                        </FlexBetween>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box>
                                            <Typography>
                                                <strong>-</strong> Response Options:
                                            </Typography>
                                            <ul style={{ listStyle: "none" }}>
                                                {question.response_options.map((option, index) => (
                                                    <li
                                                        key={index}
                                                        style={{ paddingLeft: "1.1rem", marginBottom: "10px" }}
                                                    >
                                                        {index + 1}) <strong>Response</strong>: {option.response},{' '}
                                                        <strong>Score</strong>: {option.score}
                                                    </li>
                                                ))}
                                            </ul>
                                            <Typography>
                                                <strong>-</strong> Order Display in the Questionnaire:{' '}
                                                {question.order_display_in_the_questionnaire}
                                            </Typography>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>
                    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={'1rem'}>
                        Confirmation for {deleteType ? "All" : "One"} <DeleteOutlineOutlined color="error" />
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {deleteType ? (
                        `Are you sure you want to delete all questions of this type?`
                    ) : (
                        `Are you sure you want to delete this question?`
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        onClick={() => (deleteType ? handleConfirmDeleteAll(deleteType) : handleConfirmDeleteQuestion(selectedQuestion))}
                        variant="contained"
                        color="error"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default QuestionList;
