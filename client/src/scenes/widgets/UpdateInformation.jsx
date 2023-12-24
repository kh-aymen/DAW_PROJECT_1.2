import React from "react"
import { Box, Button, Typography } from "@mui/material"
import PersonalInfoForm from "./UpdateInfo/PersonalInfoForm"
import WidgetWrapper from "components/WidgetWrapper"
import { useTheme } from "@emotion/react"
// import GenderAndBirthdayForm from "./UpdateInfo/GenderAndBirthday"
import LocationAndOccupation from "./UpdateInfo/LocationAndOccupation"
import EmailAndPassword from "./UpdateInfo/EmailAndPassword"

const UpdateInformation = () => {
    const { palette } = useTheme()




    return (
        <WidgetWrapper>
            <Box
                display={'flex'}
                flexDirection={'column'}
                gap={'18px'}
            >
                <Typography
                    color={palette.neutral.dark}
                    variant="h5"
                    fontWeight="500"
                    mb={'1rem'}
                >
                    Update Personal Information:
                </Typography>
                <PersonalInfoForm />
                {/* <GenderAndBirthdayForm /> */}
                <Typography
                    color={palette.neutral.dark}
                    variant="h5"
                    fontWeight="500"
                    mb={'1rem'}
                >
                    Update Location and Occupation:
                </Typography>
                <LocationAndOccupation />
                <Typography
                    color={palette.neutral.dark}
                    variant="h5"
                    fontWeight="500"
                    mb={'1rem'}
                >
                    Update Security:
                </Typography>
                <EmailAndPassword />
            </Box>
        </WidgetWrapper>
    )
}

export default UpdateInformation
