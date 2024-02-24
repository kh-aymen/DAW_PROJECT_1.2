import { useTheme } from '@emotion/react';
import { Search } from '@mui/icons-material';
import { Box, Button, IconButton, Input, InputAdornment, Typography, useMediaQuery } from '@mui/material'
import DoctorPatientData from 'components/DoctorPatientData';
import FlexBetween from 'components/FlexBetween';
import PatientData from 'components/PatientData';
import WidgetWrapper from 'components/WidgetWrapper'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from 'scenes/navbar';

export const DoctorsPatinetComp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const { _id } = useSelector((state) => state.user)
    const [myPatientData, setMyPatientData] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

    const { palette } = useTheme();


    const getMyPatients = async () => {
        try {
            const response = await fetch(`https://daw-project-1-2.onrender.com/doctors/MyPatients/${_id}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setMyPatientData(data.doctor.myPatient)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getMyPatients()
    }, [])

    const filteredPatient = myPatientData.filter(
        (p) =>
            p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    console.log(filteredPatient)
    return (
        <>
            <Navbar />
            <WidgetWrapper
                width={isNonMobileScreens ? '90%' : '100%'}
                margin={'2rem auto'}
            >
                <FlexBetween>
                    <Typography
                        color={palette.neutral.dark}
                        variant="h4"
                        fontWeight="500"
                        sx={{ mb: "1.5rem" }}
                    >
                        My Patients List
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: "1rem" }}>
                        <Input
                            placeholder="Search Patient..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton>
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Box>
                </FlexBetween>

                <Box display="flex" flexDirection="column" gap="1.5rem" mt={'1.5rem'} >
                    {
                        filteredPatient.map((patient) => (
                            <DoctorPatientData
                                key={patient._id}
                                patientId={patient._id}
                                userId={patient._id}
                                name={`${patient.firstName} ${patient.lastName}`}
                                subtitle={patient.occupation}
                                userPicturePath={patient.picturePath}
                                birthday={patient.birthday}
                                email={patient.email}
                                location={patient.location}
                                createdAt={patient.createdAt}
                                have_doctor={patient.have_doctor}
                            />
                        ))
                    }
                </Box>

            </WidgetWrapper>
        </>
    )
}
