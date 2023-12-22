import { Box, Button, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useTheme } from "@emotion/react";
import FlexBetween from "components/FlexBetween";
import { TextSnippetOutlined, WatchLaterOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

export const TakeTest = () => {

    const navigate = useNavigate()
    const [isTakeTest, setisTakeTest] = useState(false)
    const [isResult, setisResult] = useState(false)


    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    return (
        <WidgetWrapper p="1rem"
            sx={{
                "&:hover": {
                    cursor: "pointer",
                },
            }}>
            {isTakeTest
                ? (
                    isResult
                        ? <>
                            <br />
                            {/* Add here widget to show result to the patient 
                    add details */}
                        </>
                        : <FlexBetween>
                            <Typography
                                fontWeight="bold"
                                fontSize="1.4rem"
                                color="primary"
                                sx={{
                                    "&:hover": {
                                        color: primaryLight,
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                Waiting for Result From Doctor...
                            </Typography>
                            <WatchLaterOutlined color="primary" fontSize="large"
                                sx={{
                                    "&:hover": {
                                        color: primaryLight,
                                    },
                                }} />
                        </FlexBetween>
                )
                : <FlexBetween>
                    <Box>
                        <Box
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'flex-start'}
                            gap={'10px'}
                        >

                            <Typography
                                color={palette.neutral.dark}
                                variant="h5"
                                fontWeight="500"
                            >
                                Take a Test
                            </Typography>
                            <TextSnippetOutlined color="primary" />
                        </Box>
                        <Typography
                            color={palette.neutral.main}
                            variant="h6"
                            fontWeight="300"
                        >
                            A few questions to answer
                        </Typography>
                    </Box>
                    <Button variant="outlined"
                        onClick={() => navigate('/home/patient/test')}
                    >Here</Button>
                </FlexBetween>
            }
        </WidgetWrapper>
    )
}
