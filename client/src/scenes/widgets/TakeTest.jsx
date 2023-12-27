import { Box, Button, Typography } from "@mui/material"
import WidgetWrapper from "components/WidgetWrapper"
import { useTheme } from "@emotion/react"
import FlexBetween from "components/FlexBetween"
import { TextSnippetOutlined } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom'

export const TakeTest = () => {

    const navigate = useNavigate()
    const { palette } = useTheme()

    return (
        <WidgetWrapper
            p="1rem"
            sx={{
                "&:hover": {
                    cursor: "pointer",
                },
            }}
        >
            <FlexBetween>
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
                >
                    Here
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}
