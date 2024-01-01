import React, { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WidgetWrapper from 'components/WidgetWrapper';
import { useSelector } from 'react-redux';

export const PatientAnswers = ({ userId, from }) => {
    const token = useSelector((state) => state.token);
    const [patientData, setPatientData] = useState([]);
    const [user, setUser] = useState({});
    const [typeScores, setTypeScores] = useState({});

    const { palette } = useTheme();
    const dark = palette.neutral.dark;

    const calculeScore = (data) => {
        const scores = {};

        data.forEach(innerArray => {
            innerArray.forEach(innerObj => {
                const type = innerObj.type;
                const score = innerObj.responses[0].score;

                scores[type] = (scores[type] || 0) + score;
            });
        });

        setTypeScores(scores);
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`http://localhost:3001/users/${userId}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setPatientData(data.test_Result || []);
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const setDoctor = async () => {
            try {
                const response = await fetch(`http://localhost:3001/users/setDoctor/${userId}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (from === 'doctor') {
            setDoctor();
            getUser();
        }
    }, [userId, from, token]);

    useEffect(() => {
        // Calculate scores when patientData changes
        calculeScore(patientData);
    }, [patientData]);

    return (
        <>
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
                        Patient's Score
                    </Typography>
                </Box>
                <Box width={'100%'} height={'auto'} mt={'3rem'}>
                    {Object.entries(typeScores).map(([type, totalScore]) => (
                        <Box key={type} style={{ margin: '8px 0' }}>
                            <Typography variant="h5" color={dark} fontWeight="400">
                               -- {type} <strong>Total Score: {totalScore}</strong>
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </WidgetWrapper>
            <WidgetWrapper>
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
                        Patient's Answers
                    </Typography>
                </Box>
                <Box width={'100%'} height={'auto'} mt={'3rem'}>
                    {Array.from(new Set(patientData.flatMap((innerArray) => innerArray.map((obj) => obj.type)))).map((type) => {
                        const versions = new Set();

                        return (
                            <Accordion key={type}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${type}-content`} id={`${type}-header`}>
                                    <Typography variant="h5" color={dark} fontWeight="500">
                                        ---- {type}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {patientData
                                        .flatMap((innerArray) => innerArray.filter((obj) => obj.type === type))
                                        .map((obj, index) => {
                                            const version = obj.responses[0].version;
                                            const question = obj.responses[0].question;
                                            const score = obj.responses[0].score;

                                            // Define innerArray variable here
                                            const innerArray = patientData.flatMap((innerArray) =>
                                                innerArray.filter((innerObj) => innerObj.type === type && innerObj.responses[0].version === version)
                                            );

                                            if (!versions.has(version)) {
                                                versions.add(version);
                                                return (
                                                    <Accordion key={`${type}-${version}`}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls={`${type}-${version}-content`}
                                                            id={`${type}-${version}-header`}
                                                        >
                                                            <Typography variant="h6" color={dark} fontWeight="400">
                                                                {version ? `Version ${version}` : 'No Version'}
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            {innerArray.map((innerObj, innerIndex) => (
                                                                <Box key={innerIndex} style={{ margin: '8px 0' }}>
                                                                    <Typography fontWeight="450">{innerObj.responses[0].question}</Typography>
                                                                    <Typography fontWeight="300">Result: {innerObj.responses[0].result}</Typography>
                                                                    <Typography fontWeight="300">Score: {innerObj.responses[0].score}</Typography>
                                                                    {innerIndex < innerArray.length - 1 && <Divider />}
                                                                </Box>
                                                            ))}
                                                        </AccordionDetails>
                                                    </Accordion>
                                                );
                                            }
                                            return null;
                                        })}
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
                </Box>
            </WidgetWrapper>
        </>
    );
};
