import { Box, Button, Typography } from "@mui/material"
import WidgetWrapper from "components/WidgetWrapper"
import { useTheme } from "@emotion/react"
import FlexBetween from "components/FlexBetween"
import { useNavigate } from "react-router-dom"


export const AddDeleteQuestion = () => {

  const navigate = useNavigate()

  const { palette } = useTheme()
    return (
        <WidgetWrapper>
            <FlexBetween>
                <Box>
                    <Typography
                        color={palette.neutral.dark}
                        variant="h5"
                        fontWeight="500"
                    >
                        Tests And Questoins
                    </Typography>
                    <Typography
                        color={palette.neutral.main}
                        variant="h6"
                        fontWeight="300"
                    >
                        You can Add or Delete Test or Question
                    </Typography>
                </Box>
                <Button variant="outlined"
                    onClick={() => navigate("/home/doctor/addTestOrQuesiton")}
                >Here</Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}
