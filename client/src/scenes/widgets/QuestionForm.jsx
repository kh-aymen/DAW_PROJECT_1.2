import React, { useState } from "react"
import {
    Box,
    Button,
    Divider,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material"
import { Formik, FieldArray } from "formik"
import * as yup from "yup"
import { useSelector } from "react-redux"
import WidgetWrapper from "components/WidgetWrapper"
import QuestionList from "components/QuestionList"
import Navbar from "scenes/navbar"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const questionSchema = yup.object().shape({
    question_text: yup.string().required("Question text is required"),
    question_type: yup.string().required("Question type is required"),
    response_options: yup
        .array()
        .of(
            yup.object().shape({
                response: yup.string().required("Response is required"),
                score: yup.number().required("Score is required"),
            })
        )
        .required("At least one response option is required"),
    order_display_in_the_questionnaire: yup
        .number()
        .required("Order display in the questionnaire is required"),
})

const initialValuesQuestion = {
    question_text: "",
    question_type: "",
    response_options: [
        { response: "", score: 0 },
        { response: "", score: 0 },
        { response: "", score: 0 },
        { response: "", score: 0 },
    ],
    order_display_in_the_questionnaire: 1,
}

const QuestionForm = () => {
    const [questionAdded, setQuestionAdded] = useState(false)

    const { palette } = useTheme()
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const token = useSelector((state) => state.token)

    const handleAddQuestion = async (values, onSubmitProps) => {
        try {
            const { question_text, question_type, response_options, order_display_in_the_questionnaire } = values

            const dataToSend = {
                question_text,
                question_type,
                response_options,
                order_display_in_the_questionnaire,
            }

            const response = await fetch("http://localhost:3001/question/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(dataToSend),
            })

            if (response.ok) {
                const addedQuestion = await response.json()
                console.log("Question added successfully:", addedQuestion)

                onSubmitProps.resetForm()
                setQuestionAdded(true)
                toast.success("Question Added successfully", {
                    position: toast.POSITION.TOP_LEFT,
                })

            } else {
                const errorData = await response.json()
                console.error("Error adding question:", errorData)
            }
        } catch (error) {
            console.error("Error adding question:", error)
        }
    }


    return (
        <>
            <Navbar />
            <Box
                display={'flex'}
                flexDirection={isNonMobileScreens ? 'row' : 'column'}
                justifyContent={'space-around'}
                alignItems={'flex-start'}
                minHeight={'100vh'}
                width={'100%'}
                gap={'2rem'}
                padding={'2rem 1.5rem'}
            >
                <WidgetWrapper
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'flex-start'}
                    justifyContent={'flex-start'}
                    gap={'2rem'}
                    width={isNonMobileScreens ? undefined : '100%'}

                >
                    <Typography
                        color={palette.neutral.dark}
                        variant="h5"
                        fontWeight="500"
                    >
                        Add a Test and his Question
                    </Typography>
                    <Formik
                        onSubmit={handleAddQuestion}
                        initialValues={initialValuesQuestion}
                        validationSchema={questionSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            resetForm,
                        }) => (
                            <form onSubmit={handleSubmit}
                                style={{ width: isNonMobileScreens ? 'auto' : '100%' }}
                            >

                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": { gridColumn: isNonMobileScreens ? undefined : "span 1" },
                                    }}
                                    width={isNonMobileScreens ? undefined : '100%'}

                                >
                                    <TextField
                                        label="Question Type"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.question_type}
                                        name="question_type"
                                        error={
                                            Boolean(touched.question_type) && Boolean(errors.question_type)
                                        }
                                        helperText={touched.question_type && errors.question_type}
                                        sx={{ gridColumn: "span 1" }}
                                    />
                                    <TextField
                                        label="Question Text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.question_text}
                                        name="question_text"
                                        error={
                                            Boolean(touched.question_text) && Boolean(errors.question_text)
                                        }
                                        helperText={touched.question_text && errors.question_text}
                                        sx={{ gridColumn: "span 1" }}
                                    />
                                    <FieldArray name="response_options">
                                        {({ push, remove }) => (
                                            <Box
                                                display={'flex'}
                                                flexDirection={'column'}
                                                gap={'.8rem'}
                                            >
                                                {values.response_options.map((option, index) => (
                                                    <Box key={index}
                                                        width={'100%'}
                                                        display={'flex'}
                                                        justifyContent={'space-between'}
                                                        alignItems={'center'}
                                                        gap={'.8rem'}
                                                    >
                                                        <TextField
                                                            label={`Response ${index + 1}`}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={option.response}
                                                            name={`response_options[${index}].response`}
                                                            error={
                                                                Boolean(
                                                                    touched.response_options?.[index]?.response
                                                                ) &&
                                                                Boolean(errors.response_options?.[index]?.response)
                                                            }
                                                            helperText={
                                                                touched.response_options?.[index]?.response &&
                                                                errors.response_options?.[index]?.response
                                                            }
                                                            sx={{ gridColumn: "span 1" }}
                                                        />
                                                        <TextField
                                                            label={`Score ${index + 1}`}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={option.score}
                                                            name={`response_options[${index}].score`}
                                                            error={
                                                                Boolean(
                                                                    touched.response_options?.[index]?.score
                                                                ) &&
                                                                Boolean(errors.response_options?.[index]?.score)
                                                            }
                                                            helperText={
                                                                touched.response_options?.[index]?.score &&
                                                                errors.response_options?.[index]?.score
                                                            }
                                                            sx={{ gridColumn: "span 1" }}
                                                        />

                                                        <Button variant="outlined" onClick={() => remove(index)}>
                                                            Remove Option
                                                        </Button>
                                                    </Box>
                                                ))}
                                                <Button
                                                    variant="outlined"
                                                    onClick={() =>
                                                        push({ response: "", score: 0 })
                                                    }
                                                >
                                                    Add Option
                                                </Button>
                                            </Box>
                                        )}
                                    </FieldArray>
                                    <TextField
                                        label="Order Display in the Questionnaire"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.order_display_in_the_questionnaire}
                                        name="order_display_in_the_questionnaire"
                                        type="number"
                                        error={
                                            Boolean(
                                                touched.order_display_in_the_questionnaire
                                            ) &&
                                            Boolean(
                                                errors.order_display_in_the_questionnaire
                                            )
                                        }
                                        helperText={
                                            touched.order_display_in_the_questionnaire &&
                                            errors.order_display_in_the_questionnaire
                                        }
                                        sx={{ gridColumn: "span 1" }}
                                    />
                                </Box>

                                <Box width={'100%'} display={'flex'}>
                                    <Button type="submit" variant="contained" sx={{ margin: "1rem auto" }}>
                                        Add Question
                                    </Button>
                                </Box>

                                {questionAdded && (
                                    <Typography sx={{ mt: 2, color: "green" }}>
                                        Question added successfully!
                                    </Typography>
                                )}
                            </form>
                        )}
                    </Formik>
                </WidgetWrapper>
                {isNonMobileScreens ? undefined : <Divider sx={{ width: "100%", height: "2px" }} />}
                <WidgetWrapper
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'flex-start'}
                    justifyContent={'flex-start'}
                    gap={'2rem'}
                    width={isNonMobileScreens ? undefined : '100%'}

                >
                    <Typography
                        color={palette.neutral.dark}
                        variant="h5"
                        fontWeight="500"
                    >
                        All Tests And Questions
                    </Typography>
                    <Box
                        width={isNonMobileScreens ? undefined : '100%'}
                    >
                        <QuestionList />
                    </Box>
                </WidgetWrapper>
            </Box>
        </>
    )
}

export default QuestionForm
