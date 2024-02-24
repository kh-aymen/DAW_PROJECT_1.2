import { Box, Typography, useTheme, InputAdornment, Input, IconButton, useMediaQuery } from "@mui/material"
import Patient from "components/Patient"
import WidgetWrapper from "components/WidgetWrapper"
import { useEffect, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPatient } from "state"
import SearchIcon from "@mui/icons-material/Search"
import FlexBetween from "components/FlexBetween"
import Navbar from "scenes/navbar"
import PatientData from "components/PatientData"

const ShowPatient = ({ from }) => {
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const token = useSelector((state) => state.token)
  const patient = useSelector((state) => state.patient)
  const [searchTerm, setSearchTerm] = useState("")
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

  const getPatient = useCallback(async () => {
    const response = await fetch(`https://daw-project-1-2.onrender.com/patients/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()

    dispatch(setPatient({ patient: data }))
  }, [dispatch, token])

  useEffect(() => {
    getPatient()
  }, [])

  const filteredPatient = patient.filter(
    (p) =>
      p.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            Patients List
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: "1rem" }}>
            <Input
              placeholder="Search Patient..."
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

        <Box display="flex" flexDirection="column" gap="1.5rem" mt={'1.5rem'} >
          {
            from === "doctor"
              ?
              filteredPatient.map((patient) => (
                <PatientData
                  key={patient._id}
                  patientId={patient._id}
                  userId={patient.user._id}
                  name={`${patient.user.firstName} ${patient.user.lastName}`}
                  subtitle={patient.user.occupation}
                  userPicturePath={patient.user.picturePath}
                  birthday={patient.user.birthday}
                  email={patient.user.email}
                  location={patient.user.location}
                  createdAt={patient.user.createdAt}
                  have_doctor={patient.user.have_doctor}
                />
              ))
              :
              filteredPatient.map((patient) => (
                <Patient
                  key={patient._id}
                  patientId={patient._id}
                  userId={patient.user._id}
                  name={`${patient.user.firstName} ${patient.user.lastName}`}
                  subtitle={patient.user.occupation}
                  userPicturePath={patient.user.picturePath}
                  birthday={patient.user.birthday}
                  email={patient.user.email}
                  location={patient.user.location}
                  createdAt={patient.user.createdAt}
                />
              ))

          }
        </Box>
      </WidgetWrapper>
    </>
  )
}

export default ShowPatient
