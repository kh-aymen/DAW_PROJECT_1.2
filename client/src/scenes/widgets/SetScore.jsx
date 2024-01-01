import React, { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { Box, Typography, Slider, Button } from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';
import { useSelector } from 'react-redux';

export const SetScore = ({ userId }) => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const token = useSelector((state) => state.token);
    const [myplansAndReviewsValues, setMyplansAndReviewsValues] = useState({});
    const [scorevalue, setscorevalue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const MyplansAndReviews = async () => {
        try {
            const response = await fetch(`http://localhost:3001/patients/getMyplansAndReviews/${userId}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setMyplansAndReviewsValues(data);
            setLoading(false);
        } catch (error) {
            setError(error.message || 'Error fetching user data');
            setLoading(false);
        }
    };
    useEffect(() => {
        MyplansAndReviews();
    }, [userId]);

    const MyplansAndReviewsPost = async () => {
        try {
            const response = await fetch(`http://localhost:3001/patients/setMyplansAndReviews/${userId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ scorevalue }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error posting user data:', error);
        }
    };



    const handlescorevalueChange = (event, newValue) => {
        setscorevalue(newValue);
    };

    const handleSubmit = () => {

        MyplansAndReviewsPost();
    };

    return (
        <>
            <WidgetWrapper>
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
                    Set Patient's score
                </Typography>

                <Box mt={3}>
                    {loading ? (
                        <Typography variant="body1" color={palette.neutral.main} mb={1}>
                            Loading...
                        </Typography>
                    ) : error ? (
                        <Typography variant="body1" color={palette.error.main} mb={1}>
                            {error}
                        </Typography>
                    ) : (
                        <>
                            <Typography variant="body1" color={palette.neutral.main} mb={1}>
                                Patient's score: {scorevalue}
                            </Typography>

                            <Slider
                                value={scorevalue}
                                onChange={handlescorevalueChange}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={100}
                            />

                            <Box mt={3}>
                                <Button variant="contained" color="primary" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </WidgetWrapper>
        </>
    );
};
