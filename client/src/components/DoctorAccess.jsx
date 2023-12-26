import React, { useState } from "react"
import {
    Box,
    Typography,
    useTheme,
    Switch, 
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setDoctor } from "state"
import FlexBetween from "./FlexBetween"
import UserImage from "./UserImage"

const DoctorAccess = ({
    doctorId,
    name,
    userPicturePath,
    email,
    access,
}) => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const [switchValue, setSwitchValue] = useState(access) 
    const doctor = useSelector((state) => state.doctor)

    const { palette } = useTheme()
    const main = palette.neutral.main
    const medium = palette.neutral.medium
    const defaultColor = palette.background.default


    const handleAccessValue = async () => {
        const dataToSend = {
            data_access_value: switchValue
        }

        try {
            const response = await fetch(`http://localhost:3001/doctors/access/${doctorId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()

            const newDoctorsArray = doctor.map(doctorItem => {
                if (doctorItem._id === doctorId) {
                    return {
                        ...doctorItem,
                        data_access: data.result,
                    }
                } else {
                    return doctorItem
                }
            })
            dispatch(setDoctor({ doctor: newDoctorsArray }))
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }


    const handleSwitchChange = () => {
        setSwitchValue(!switchValue)
        handleAccessValue()

    }

    return (
        <FlexBetween
            p={"1rem 0.2rem"}
            sx={{
                "&:hover": {
                    backgroundColor: defaultColor,
                },
            }}
        >
            <Box
                width={"233px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-start"}
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
            <Switch
                checked={switchValue}
                onChange={handleSwitchChange}
                color="primary"
            />
        </FlexBetween>
    )
}

export default DoctorAccess
