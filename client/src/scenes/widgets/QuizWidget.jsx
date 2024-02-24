import React, { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Paper,
    Radio,
    Typography,
    Fade,
    useMediaQuery,
    Card,
    CardContent,
    CardActionArea,
    Box,
} from "@mui/material"
import { ArrowForward } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "@emotion/react"
import { useNavigate } from "react-router-dom"
import WidgetWrapper from "components/WidgetWrapper"
import Navbar from "scenes/navbar"
import { setQuiz, setUser } from "state"

const QuizForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const quiz = useSelector((state) => state.quiz)
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const [resultOfQuiz, setresultOfQuiz] = useState([])
    const [selectedType, setSelectedType] = useState(null)
    const [typeCompletionStatus, setTypeCompletionStatus] = useState({})
    const [isDone, setIsDone] = useState(false)
    const user = useSelector((state) => state.user);

    const { palette } = useTheme()
    const mediumMain = palette.neutral.mediumMain
    const primarymain = palette.primary.main
    const dark = palette.dark

    useEffect(() => {
        const getQuestions = async () => {
            const response = await fetch("https://daw-project-1-2.onrender.com/question", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await response.json()
            dispatch(setQuiz({ quiz: data }))
        }

        getQuestions()
    }, [dispatch, token])

    const questions = quiz || []
    const types = [...new Set(questions.map((question) => question.question_type))]

    const handleTypeClick = (type) => {
        setSelectedType(type)
        setCurrentQuestionIndex(questions.findIndex((q) => q.question_type === type))
        setTypeCompletionStatus({})
    }

    const sortedQuestions = [...questions]
    const currentQuestion = sortedQuestions[currentQuestionIndex]

    const getNumberOfQuestionsOfType = (questions, type) => {
        return questions.filter((question) => question.question_type === type).length
    }


    const setTestResult = async (TestResult) => {
        const response = await fetch(`https://daw-project-1-2.onrender.com/users/addTestResulte/${user._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(TestResult),
        })
        const data = await response.json()
        dispatch(setUser({ user: data.user }))
    }
    useEffect(() => {
        if (isDone) {
            setIsDone(false)
            setTestResult(resultOfQuiz)
            navigate('/home/patient')
        }
    }, [resultOfQuiz]);

    const formik = useFormik({
        initialValues: {
            [`question${currentQuestion?.id}`]: "",
        },
        validationSchema: Yup.object().shape({
            [`question${currentQuestion?.id}`]: Yup.string().required("This question is required"),
        }),
        onSubmit: async (values) => {
            // console.log("Form submitted:", values[`question${currentQuestion?.id}`])
            const scoreVal = currentQuestion.response_options.find(option => option.response === values[`question${currentQuestion?.id}`])?.score;
            const currentQuestionResponse = {
                type: selectedType,
                responses: [
                    {
                        question: currentQuestion?.question_text,
                        result: values[`question${currentQuestion?.id}`],
                        score: scoreVal
                    },
                ],
            }


            setresultOfQuiz(prevResult => [...prevResult, currentQuestionResponse]);


            const remainingQuestions = sortedQuestions.slice(currentQuestionIndex + 1);
            const nextQuestionOfSameTypeIndex = remainingQuestions.findIndex(
                (q) => q.question_type === selectedType
            )

            if (nextQuestionOfSameTypeIndex !== -1) {
                // If there is another question of the same type, move to it
                setCurrentQuestionIndex(currentQuestionIndex + 1 + nextQuestionOfSameTypeIndex)
            } else {
                // If there are no more questions of the same type, move to the next type
                setCurrentQuestionIndex(currentQuestionIndex + 1)
                setSelectedType(null)
            }

            if (selectedType) {
                const numberOfQuestionsOfType = getNumberOfQuestionsOfType(questions, selectedType)
                const numberOfAnsweredQuestionsOfType = resultOfQuiz.filter(
                    (response) => response.type === selectedType
                ).length + 1 // Increment by 1

                // console.log("Number of Questions of Type:", numberOfQuestionsOfType)
                // console.log("Number of Answered Questions of Type:", numberOfAnsweredQuestionsOfType)

                if (numberOfQuestionsOfType === numberOfAnsweredQuestionsOfType) {
                    setIsDone(true)
                }
            }

            formik.resetForm()
        },

    })

    return (
        <>
            <Navbar />
            <WidgetWrapper
                borderradius={'0px'}
                width={'90%'}
                margin={'auto'}
                mt={'2.3rem'}
            >
                <Container
                    component="main"
                    maxWidth="lg"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5rem",
                        minHeight: "auto",

                    }}
                >
                    {selectedType ? (
                        typeCompletionStatus[selectedType] ? (
                            <Typography variant="h4" gutterBottom>
                                Loading...
                            </Typography>
                        ) : (
                            <>
                                <Typography variant="h3" color={dark} fontWeight="400">
                                    Select Just One Reponse
                                </Typography>
                                <Paper style={{ padding: 20, width: isNonMobileScreens ? "75%" : "100%" }} elevation={3}>
                                    <Fade in={true} timeout={500}>
                                        <form onSubmit={formik.handleSubmit}>
                                            <FormControl component="fieldset" margin="normal" fullWidth>
                                                <FormLabel component="legend">{currentQuestion?.question_text}</FormLabel>
                                                <FormGroup>
                                                    {Array.isArray(currentQuestion.response_options) &&
                                                        currentQuestion.response_options.map((option, index) => (
                                                            <FormControlLabel
                                                                key={index}
                                                                control={
                                                                    currentQuestion.response_options.length > 1 ? (
                                                                        <Checkbox color="primary" />
                                                                    ) : (
                                                                        <Radio color="primary" />
                                                                    )
                                                                }
                                                                label={Array.isArray(option) ? option[0] : option.response}
                                                                value={Array.isArray(option) ? option[0] : option.response}
                                                                onChange={(e) =>
                                                                    formik.setFieldValue(
                                                                        `question${currentQuestion?.id}`,
                                                                        e.target.checked
                                                                            ? Array.isArray(option)
                                                                                ? option[0]
                                                                                : option.response
                                                                            : ""
                                                                    )
                                                                }
                                                                checked={
                                                                    formik.values[`question${currentQuestion?.id}`] ===
                                                                    (Array.isArray(option) ? option[0] : option.response)
                                                                }
                                                            />
                                                        ))}
                                                </FormGroup>
                                                <FormHelperText error>
                                                    {formik.touched[`question${currentQuestion?.id}`] &&
                                                        formik.errors[`question${currentQuestion?.id}`]}
                                                </FormHelperText>
                                            </FormControl>
                                            {/* <Typography variant="body2" color="textSecondary">
                                                 Number of questions in this test is{" "}
                                                 {getNumberOfQuestionsOfType(selectedType)}
                                               </Typography> */}
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                endIcon={<ArrowForward />}
                                                style={{ marginTop: 20 }}
                                            >
                                                {currentQuestionIndex === sortedQuestions.length - 1 ? "Submit" : "Next Question"}
                                            </Button>
                                        </form>
                                    </Fade>
                                </Paper>
                            </>
                        )
                    ) : (
                        <Typography variant="h2" color={dark} fontWeight="500">
                            Select a Test type to start
                        </Typography>
                    )}
                    <Box
                        sx={{
                            width: "100%",
                            padding: "1rem 2rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "1rem",
                            flexWrap: "wrap",
                        }}
                    >
                        {types.map((type, index) => (
                            // Show all types initially, hide others when a type is selected
                            selectedType ? (
                                selectedType === type && (
                                    <Card
                                        key={index}
                                        style={{ minWidth: 250, cursor: "pointer" }}
                                        sx={{
                                            textAlign: "center",
                                            "&:hover": {
                                                backgroundColor: primarymain,
                                            },
                                            "&:hover h6": {
                                                color: "#000",
                                            },
                                        }}
                                        onClick={() => {
                                            setresultOfQuiz([])
                                            window.location.reload()
                                        }}
                                    >
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography variant="h6" color={mediumMain}>
                                                    Change the test or Retest
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                )
                            ) : (
                                <Card
                                    key={index}
                                    style={{ minWidth: 250, cursor: "pointer" }}
                                    onClick={() => handleTypeClick(type)}
                                    sx={{
                                        textAlign: "center",
                                        "&:hover": {
                                            backgroundColor: primarymain,
                                        },
                                        "&:hover h6": {
                                            color: "#000",
                                        },
                                    }}
                                >
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant="h6" color={mediumMain}>
                                                {type}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        ))}
                    </Box>
                </Container>
            </WidgetWrapper>
        </>
    )
}

export default QuizForm
