import { useTheme } from '@emotion/react';
import { Box, Button, Typography } from '@mui/material'
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const DoctorsPatinet = ({ access }) => {
    const navigate = useNavigate()

    const { palette } = useTheme();
    const dark = palette.neutral.dark;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Box>
                    <Typography
                        color={palette.neutral.dark}
                        variant="h5"
                        fontWeight="500"
                    >
                        My Patients
                    </Typography>
                    <Typography
                        color={palette.neutral.main}
                        variant="h6"
                        fontWeight="300"
                    >
                        See My patient's Score and review theme
                    </Typography>
                </Box>
                {
                    access ?
                        <Button variant="outlined"
                            onClick={() => navigate("/home/doctor/MyPatient")}
                        >Here</Button>
                        : <Button variant="outlined" disabled>Don't Have access</Button>
                }
            </FlexBetween>

        </WidgetWrapper>
    )
}
