import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material"
import { Box, Typography, Divider, useTheme, Button } from "@mui/material"
import UserImage from "components/UserImage"
import FlexBetween from "components/FlexBetween"
import WidgetWrapper from "components/WidgetWrapper"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { setUser } from "state"

const UserWidget = ({ userId, picturePath, moreinfo, from }) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const { palette } = useTheme()
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)
  const dark = palette.neutral.dark
  const medium = palette.neutral.medium
  const main = palette.neutral.main

  const getUser = async () => {
    const response = await fetch(`https://daw-project-1-2.onrender.com/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setUser(data)
  }
  const handleRestAllTests = async () => {
    const response = await fetch(`https://daw-project-1-2.onrender.com/users/restResulte/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    dispatch(setUser({ user: data.user }))
  }
  useEffect(() => {
    getUser();
  }, [userId, token]);

  if (!user) {
    return null
  }
  const {
    firstName,
    lastName,
    location,
    occupation,
    gender,
    birthday,
    role,
    email,
    test_Result
  } = user


  const formattedBirthday = new Date(birthday).toLocaleDateString()
  var numberOfAllTestResponded = test_Result ? test_Result.length : 0;

  const AllTypesOfTest = test_Result ? [...new Set(test_Result.flat().map(item => item.type))] : [];
  const typeCounts = AllTypesOfTest.map(type => ({
    type,
    count: test_Result ? test_Result.filter(arr => arr.some(item => item.type === type)).length : 0
  }))

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() =>
          from === 'doctor' ? undefined : navigate(`/profile/${userId}`)
        }
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography
              variant="h6"
              color={medium}
            >
              {email}
            </Typography>
          </Box>
        </FlexBetween>
        {from === 'doctor' ? '' : <ManageAccountsOutlined />}
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Role: </Typography>
          <Typography color={main} fontWeight="500">
            {role}
          </Typography>
        </FlexBetween>
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Birthday: </Typography>
          <Typography color={main} fontWeight="500">
            {formattedBirthday}
          </Typography>
        </FlexBetween>
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Gender: </Typography>
          <Typography color={main} fontWeight="500">
            {gender}
          </Typography>
        </FlexBetween>
        {moreinfo === false
          ?
          (
            (() => {
              switch (role) {
                case 'Patient':
                  return (
                    <>
                      <FlexBetween mb="0.5rem">
                        <Typography color={medium}>Number Of All Tests Passed: </Typography>
                        <Typography color={main} fontWeight="500">
                          {numberOfAllTestResponded}
                        </Typography>
                      </FlexBetween>
                      {
                        typeCounts.map((item, key) => {
                          return (
                            <FlexBetween mb="0.5rem" key={key}>
                              <Typography color={medium}>-{item.type}: </Typography>
                              <Typography color={main} fontWeight="500">
                                {item.count}
                              </Typography>
                            </FlexBetween>
                          )
                        })
                      }
                      {from === 'doctor'
                        ? <></>
                        :
                        numberOfAllTestResponded === 0
                          ? <Button variant="outlined" onClick={handleRestAllTests} disabled>Rest All Tests</Button>
                          : <Button variant="outlined" onClick={handleRestAllTests} >Rest All Tests</Button>
                      }
                    </>
                  );
                case 'Doctor':
                  return (
                    <div>
                      ... (doctor content)
                    </div>
                  );
                case 'Admin':
                  return (
                    <div>
                      ... (admin content)
                    </div>
                  );

              }
            })())
          : <Box
            mb="0.5rem"
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography
              color={medium}
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/profile/${userId}`)}
            >
              show more information ...</Typography>
          </Box>
        }
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          {from === 'doctor' ? '' : <EditOutlined sx={{ color: main }} />}
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          {from === 'doctor' ? '' : <EditOutlined sx={{ color: main }} />}
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  )
}

export default UserWidget
