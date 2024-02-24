import { Box, Typography, useTheme, InputAdornment, Input, IconButton, useMediaQuery } from "@mui/material"
import WidgetWrapper from "components/WidgetWrapper"
import { useEffect, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setDoctor } from "state"
import SearchIcon from "@mui/icons-material/Search"
import FlexBetween from "components/FlexBetween"
import Navbar from "scenes/navbar"
import DoctorAccessComponent from "components/DoctorAccess"

const DoctorAccess = () => {
    const dispatch = useDispatch()
    const { palette } = useTheme()
    const token = useSelector((state) => state.token)
    const doctor = useSelector((state) => state.doctor)
    const [searchTerm, setSearchTerm] = useState("")
    const isNonMobileScreens = useMediaQuery("(min-width:700px)")

    const getDoctor = useCallback(async () => {
        const response = await fetch(`https://daw-project-1-2.onrender.com/doctors/`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        dispatch(setDoctor({ doctor: data }))
    }, [dispatch, token])

    useEffect(() => {
        getDoctor()
    }, [getDoctor])

    const filteredDoctors = doctor.filter(
        (doc) =>
            doc.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <Navbar />
            <WidgetWrapper
                width={isNonMobileScreens ? '700px' : '100%'}
                margin={'2rem auto'}
            >
                <FlexBetween>
                    <Typography
                        color={palette.neutral.dark}
                        variant="h4"
                        fontWeight="500"
                        sx={{ mb: "1.5rem" }}
                    >
                        Give Or Remove Access To Doctors
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: "1rem" }}>
                        <Input
                            placeholder="Search doctors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Box>
                </FlexBetween>
                <Box display="flex" flexDirection="column" gap="1.5rem" mt={'1.5rem'}>
                    {filteredDoctors.map((doctor) => (
                        <DoctorAccessComponent
                            key={doctor._id}
                            doctorId={doctor._id}
                            userId={doctor.user._id}
                            name={`${doctor.user.firstName} ${doctor.user.lastName}`}
                            subtitle={doctor.user.occupation}
                            userPicturePath={doctor.user.picturePath}
                            birthday={doctor.user.birthday}
                            email={doctor.user.email}
                            location={doctor.user.location}
                            createdAt={doctor.user.createdAt}
                            access={doctor.data_access}
                        />
                    ))}
                </Box>
            </WidgetWrapper>
        </>
    )
}

export default DoctorAccess
