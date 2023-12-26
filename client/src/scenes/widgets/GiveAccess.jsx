import { Box, Button, Typography } from "@mui/material"
import WidgetWrapper from "components/WidgetWrapper"
import { useTheme } from "@emotion/react"
import FlexBetween from "components/FlexBetween"
import { useNavigate } from "react-router-dom"


export const GiveAccess = () => {

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
                        Doctor's Access 
                    </Typography>
                    <Typography
                        color={palette.neutral.main}
                        variant="h6"
                        fontWeight="300"
                    >
                        give to the doctor access to patient's data
                    </Typography>
                </Box>
                <Button variant="outlined"
                    onClick={() => navigate("/home/admin/access")}
                >Here</Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}
