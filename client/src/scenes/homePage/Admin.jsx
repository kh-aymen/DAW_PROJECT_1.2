import { Box, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"
import Navbar from "scenes/navbar"
import UserWidget from "scenes/widgets/UserWidget"
import { DeleteDoctors } from "scenes/widgets/DeleteDoctors"
import { DeletePatient } from "scenes/widgets/DeletePatient"
import { GiveAccess } from "scenes/widgets/GiveAccess"

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const { _id, picturePath } = useSelector((state) => state.user)

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
          <UserWidget userId={_id} picturePath={picturePath} moreinfo={true} typeOfUser={'admin'}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <GiveAccess/>
          {/* <Widget here /> */}
        </Box>
        <Box flexBasis="26%">
          <DeleteDoctors />
          <Box m="2rem 0" />
          <DeletePatient />
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage
