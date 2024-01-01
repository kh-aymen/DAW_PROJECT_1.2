import { Box, Typography, useTheme, useMediaQuery, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import FlexBetween from "./FlexBetween"
import UserImage from "./UserImage"
import { useNavigate } from "react-router-dom"

const PatientData = ({ patientId, userId, name, subtitle, userPicturePath, birthday, email, location, createdAt, have_doctor }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)
    const patient = useSelector((state) => state.patient)
    const Ids = { patientId, userId }
    const isNonMobileScreens = useMediaQuery("(min-width:900px)")
    const userFromRedux = useSelector((state) => state.user)
    const { palette } = useTheme()
    const main = palette.neutral.main
    const medium = palette.neutral.medium
    const defaultColor = palette.background.default

    const getUserAndsetDactorsPatient = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()


        const response2 = await fetch(`http://localhost:3001/doctors/addPatient/${userId}/${userFromRedux._id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const data2 = await response2.json()

        const response3 = await fetch(`http://localhost:3001/patients/addDoctor/${userId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userFromRedux),
        })
        const data3 = await response3.json()

    }
    const handlePatientClick = async () => {
        await getUserAndsetDactorsPatient()
        navigate(`/doctor/patietnt/data/${userId}`)
        navigate(0)
    };
    return (
        <FlexBetween
            p={'1rem 0.2rem'}
            sx={have_doctor ? {
            } : {
                "&:hover": {
                    backgroundColor: defaultColor,
                },
            }}
            onClick={!have_doctor ? handlePatientClick : undefined}
        >
            <Box
                width={'233px'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'flex-start'}
                gap="1rem"

            >
                <UserImage image={userPicturePath} size="55px" />
                <Box>
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer",
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {email}
                    </Typography>
                </Box>
            </Box>

            {
                isNonMobileScreens &&
                <>
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'flex-start'}
                        flexDirection={'column'}
                    >
                        <Typography color={medium} fontSize="0.75rem">
                            Location: {location}
                        </Typography>
                        <Typography color={medium} fontSize="0.75rem">
                            Birthday: {new Date(birthday).toLocaleDateString()}
                        </Typography>
                    </Box>

                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'flex-start'}
                        flexDirection={'column'}
                    >
                        <Typography color={medium} fontSize="0.75rem">
                            Occupation: {subtitle}
                        </Typography>
                        <Typography color={medium} fontSize="0.75rem">
                            Date of Account: {new Date(createdAt).toLocaleDateString()}
                        </Typography>
                    </Box>
                </>
            }
            <Box>
                {have_doctor
                    ? <Typography color={'#2e7d32'} fontWeight={500}>Have A Doctor</Typography>
                    : <Typography color={'#d32f2f'} fontWeight={500}>Still WithOut A Doctor</Typography>
                }
            </Box>
        </FlexBetween>
    )
}

export default PatientData
