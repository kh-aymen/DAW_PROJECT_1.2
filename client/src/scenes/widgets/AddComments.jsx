import { useTheme } from '@emotion/react';
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';
import React, { useState } from 'react';

export const AddComments = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;

    const [textValue, setTextValue] = useState('');
    const [appointmentNeeded, setAppointmentNeeded] = useState(false);
    const [appointmentDate, setAppointmentDate] = useState('');

    const handleChange = (event) => {
        setTextValue(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setAppointmentNeeded(event.target.checked);
    };

    const handleDateChange = (event) => {
        setAppointmentDate(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(textValue);
        setTextValue('');
    };
    const handleSubmitDate = (event) => {
        event.preventDefault();
        console.log(appointmentDate);
        setAppointmentDate('');
    };
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
                            value={textValue}
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
    );
};
