import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Countup from 'react-countup';
import FlexBetween from 'components/FlexBetween';

export const SeeMyCommets = ({ userId }) => {
    const token = useSelector((state) => state.token);
    const [results, setResults] = useState({});
    const { palette } = useTheme();

    const getMyResult = async () => {
        try {
            const response = await fetch(`http://localhost:3001/patients/getResult/${userId}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setResults(data.patient);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getMyResult();
    }, [userId]);

    return (
        <>
            <WidgetWrapper>
                <Box>
                    <Typography color={palette.neutral.dark} variant="h4" fontWeight="600">
                        My Results
                    </Typography>
                </Box>
            </WidgetWrapper>

            <WidgetWrapper mt={'2rem'}>
                <Box>
                    <Typography color={palette.neutral.dark} variant="h5" fontWeight="500">
                        Doctor's Comments
                    </Typography>
                    <Typography color={palette.neutral.dark} variant="h6" fontWeight="300" sx={{ mt: '12px' }}>
                        {results.comments ? (
                            <>
                                <Typography color={palette.neutral.dark} variant="h6" fontWeight="300">
                                    {results.comments}
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography color={palette.neutral.dark} variant="h6" fontWeight="300">
                                    Wait For Your Doctor To Comment About You
                                </Typography>
                            </>
                        )}
                    </Typography>
                </Box>
            </WidgetWrapper>

            <WidgetWrapper mt={'2rem'}>
                <Box>
                    <Typography color={palette.neutral.dark} variant="h5" fontWeight="500">
                        My Score
                    </Typography>
                </Box>
                <Box sx={{ mt: '12px' }}>
                    {results.score ? (
                        <>
                            <Typography
                                color={results.score <= 30 ? '#2e7d32' : results.score <= 55 ? '#0288d1' : '#d32f2f'}
                                variant="h3"
                                fontWeight="600"
                                textAlign={'center'}
                            >
                                <Countup start={0} end={results.score} duration={2.5} enableScrollSpy /> %
                            </Typography>
                            <Typography
                                color={results.score <= 30 ? '#2e7d32' : results.score <= 55 ? '#0288d1' : '#d32f2f'}
                                variant="h3"
                                fontWeight="600"
                                textAlign={'center'}
                                sx={{ mt: '1rem' }}
                            >
                                {results.score <= 30 ? 'Enjoy gaming responsibly. Balance is key.' : results.score <= 55 ? 'Be mindful of your gaming habits. Take breaks.' : 'Consider reducing gaming time. Prioritize other activities.'}

                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography color={palette.neutral.dark} variant="h6" fontWeight="300">
                                You have not scored yet. Wait for your doctor to score you after checking the test result.
                            </Typography>
                        </>
                    )}
                </Box>
            </WidgetWrapper>

            <WidgetWrapper mt={'2rem'} mb={'2rem'}>
                <Box>
                    <Typography color={palette.neutral.dark} variant="h5" fontWeight="500">
                        Date Of Appointment
                    </Typography>
                    <Typography color={palette.neutral.dark} variant="h6" fontWeight="300" sx={{ mt: '12px' }}>
                        {results.appointment ? (
                            <>
                                <Typography variant="h4" fontWeight="500">
                                    {results.appointment}
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography color={palette.neutral.dark} variant="h6" fontWeight="300">
                                    Your doctor did not give you an appointment because you do not need it.
                                </Typography>
                            </>
                        )}
                    </Typography>
                </Box>
            </WidgetWrapper>
        </>
    );
};
