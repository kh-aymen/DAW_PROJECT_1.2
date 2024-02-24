import { Box, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"
import Navbar from "scenes/navbar"
import UserWidget from "scenes/widgets/UserWidget"
import { AddDeleteQuestion } from "scenes/widgets/AddDeleteQuestion"
import { ShowAllPatientToDoctor } from "scenes/widgets/ShowAllPatientToDoctor"
import { useEffect, useState } from "react"
import { DoctorsPatinet } from "scenes/widgets/DoctorsPatinet"

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const { _id, picturePath } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const [access, setAccess] = useState(false)


  const getDoctor = async () => {
    const response = await fetch(`https://daw-project-1-2.onrender.com/doctors/getone/${_id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setAccess(data.data_access)
  }
  useEffect(() => {
    getDoctor()
  }, [_id])

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        height={isNonMobileScreens ? "90vh" : "auto"}
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} moreinfo={true} typeOfUser={'doctor'} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <DoctorsPatinet access={access} />

          {/* <Widget here /> */}
        </Box>
        <Box flexBasis="26%">
          {/* <AdvertWidget /> */}
          <AddDeleteQuestion access={access} />
          <Box m="2rem 0" />
          <ShowAllPatientToDoctor access={access} />
          {/* <Widget here /> */}
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage
