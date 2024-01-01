import { Box, Button, Typography } from "@mui/material"
import WidgetWrapper from "components/WidgetWrapper"
import { useTheme } from "@emotion/react"
import FlexBetween from "components/FlexBetween"
import { useNavigate } from "react-router-dom"


export const ShowAllPatientToDoctor = ({ access }) => {

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
                        See All Patient
                    </Typography>
                    <Typography
                        color={palette.neutral.main}
                        variant="h6"
                        fontWeight="300"
                    >
                        See the patient and his data
                    </Typography>
                </Box>
                {
                    access ?
                        <Button variant="outlined"
                            onClick={() => navigate("/home/doctor/patients")}
                        >Here</Button>
                        :<Button  variant="outlined" disabled>Don't Have access</Button>
                }
            </FlexBetween>
        </WidgetWrapper>
    )
}
