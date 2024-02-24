import { useTheme } from '@emotion/react'
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material'
import WidgetWrapper from 'components/WidgetWrapper'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



export const AddComments = ({ userId }) => {
    const token = useSelector((state) => state.token)
    const { palette } = useTheme()
    const dark = palette.neutral.dark

    const [commentsvalue, setCommentsvalue] = useState('')
    const [appointmentNeeded, setAppointmentNeeded] = useState(false)
    const [appointmentDate, setAppointmentDate] = useState('')

    const MyplansAndReviewsPost = async () => {
        try {
            const response = await fetch(`https://daw-project-1-2.onrender.com/patients/setMyplansAndReviews/comment/${userId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ commentsvalue }),
            })
            const data = await response.json()
        } catch (error) {
            console.error('Error posting user data:', error)
        }
    }

    const MyplansAndReviewsPostDate = async () => {
        try {
            const response = await fetch(`https://daw-project-1-2.onrender.com/patients/setMyplansAndReviews/appointmentDate/${userId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ appointmentDate }),
            })
            const data = await response.json()
        } catch (error) {
            console.error('Error posting user data:', error)
        }
    }

    const handleChange = (event) => {
        setCommentsvalue(event.target.value)
    }

    const handleCheckboxChange = (event) => {
        setAppointmentNeeded(event.target.checked)
    }

    const handleDateChange = (event) => {
        setAppointmentDate(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        MyplansAndReviewsPost()
        setCommentsvalue('')
        toast.success("Comment Added In successfully", {
            position: toast.POSITION.TOP_LEFT,
        })
    }
    const handleSubmitDate = (event) => {
        event.preventDefault()
        MyplansAndReviewsPostDate()
        setAppointmentDate('')
        toast.success("Appointment Date Added successfully", {
            position: toast.POSITION.TOP_LEFT,
        })
    }
    return (
        <WidgetWrapper mb={'2rem'}>
            <Box>
                <Typography
                    variant="h4"
                    color={dark}
                    fontWeight="600"
                    sx={{
                        '&:hover': {
                            color: palette.primary.light,
                            cursor: 'pointer',
                        },
                    }}
                >
                    Add Comments or Chat With the Patient
                </Typography>
            </Box>
            <Box mt={'1rem'}>
                <Button variant='outlined'>Click to chat with patient</Button>
            </Box>
            <Box mt={'1rem'}>
                <Box mt={'2rem'}>
                    <Typography
                        variant="h5"
                        color={dark}
                        fontWeight="400"
                    >
                        Send a Plane and Comments
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="standard-multiline-static"
                            label="Multiline"
                            multiline
                            rows={4}
                            value={commentsvalue}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
                <Box mt={'2rem'}>
                    <Typography
                        variant="h5"
                        color={dark}
                        fontWeight="400"
                    >
                        Need an appointment?
                        <Checkbox
                            checked={appointmentNeeded}
                            onChange={handleCheckboxChange}
                            style={{ marginLeft: '0.5rem' }}
                        />
                    </Typography>
                    {appointmentNeeded && (
                        <form onSubmit={handleSubmitDate}>
                            <>
                                <TextField
                                    id="appointment-date"
                                    label=""
                                    type="date"
                                    value={appointmentDate}
                                    onChange={handleDateChange}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required={appointmentNeeded}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '1rem' }}
                                >
                                    Submit
                                </Button>
                            </>
                        </form>
                    )}
                </Box>
            </Box>
        </WidgetWrapper>
    )
}
