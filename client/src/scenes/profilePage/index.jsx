import { Box, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Navbar from "scenes/navbar"
import UpdateImage from "scenes/widgets/UpdateInfo/UpdateImage"
import UpdateInformation from "scenes/widgets/UpdateInformation"
import UserWidget from "scenes/widgets/UserWidget"

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  const token = useSelector((state) => state.token)
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, [])

  if (!user) return null

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "36%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} moreinfo={false} />
          <Box m="2rem 0" />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "59%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <UpdateImage userId={userId} picturePath={user.picturePath} />
          <Box mt={'2rem'}/>
          <UpdateInformation />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage