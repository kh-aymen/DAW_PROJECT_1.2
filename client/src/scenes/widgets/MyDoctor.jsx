import { Box, Button, Typography } from "@mui/material"
import WidgetWrapper from "components/WidgetWrapper"
import { useTheme } from "@emotion/react"
import FlexBetween from "components/FlexBetween"
import { TextSnippetOutlined } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import UserImage from "components/UserImage"

export const MyDoctor = () => {
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const [MyDoctor, setMyDoctor] = useState({})
    const navigate = useNavigate()
    const { palette } = useTheme()

    const getMydoctor = async () => {
        try {
            const response = await fetch(`http://localhost:3001/patients/getMyDoctor/${user._id}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setMyDoctor(data.patient.myDoctor)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getMydoctor()
    }, [user])

    if (user.have_doctor) {
        function calculateAge(birthdate) {
            const birthdateObj = new Date(birthdate);
            const currentDate = new Date();

            let age = currentDate.getFullYear() - birthdateObj.getFullYear();
            if (
                currentDate.getMonth() < birthdateObj.getMonth() ||
                (currentDate.getMonth() === birthdateObj.getMonth() &&
                    currentDate.getDate() < birthdateObj.getDate())
            ) {
                age--;
            }

            return age;
        }
        var Age = calculateAge(MyDoctor.birthday);

    }


    return (
        <WidgetWrapper
            p="1rem"
            sx={{
                "&:hover": {
                    cursor: "pointer",
                },
            }}
        >
            <Box>
                <Typography
                    color={palette.neutral.dark}
                    variant="h5"
                    fontWeight="500"
                >
                    My Doctor
                </Typography>
                <Typography
                    color={palette.neutral.main}
                    variant="h6"
                    fontWeight="300"
                >
                    See About My Doctor
                </Typography>

            </Box>

            <Box
                mt={'1.5rem'}
                display={'flex'}
                alignItems={'flex-start'}
                justifyContent={'flex-start'}
                flexDirection={'column'}
                gap={'1.4rem'}
            >
                {
                    user.have_doctor
                        ?
                        <>
                            <Box
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'flex-start'}
                                gap={'1.4rem'}
                            >
                                <UserImage image={MyDoctor.picturePath} />
                                <Box>
                                    <Typography
                                        color={palette.neutral.main}
                                        variant="h6"
                                        fontWeight="300"
                                    >
                                        <strong>FirstName:  </strong> {MyDoctor.firstName}
                                    </Typography>
                                    <Typography
                                        color={palette.neutral.main}
                                        variant="h6"
                                        fontWeight="300"
                                    >
                                        <strong>LastName:  </strong>  {MyDoctor.lastName}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography
                                color={palette.neutral.main}
                                variant="h6"
                                fontWeight="300"
                            >
                                <strong>Email:  </strong>{MyDoctor.email}
                            </Typography>
                            <Typography
                                color={palette.neutral.main}
                                variant="h6"
                                fontWeight="300"
                            >
                                <strong>Age:  </strong>{Age}
                            </Typography>
                            <Typography
                                color={palette.neutral.main}
                                variant="h6"
                                fontWeight="300"
                            >
                                <strong>Gender:  </strong>{MyDoctor.gender}
                            </Typography>
                            <Typography
                                color={palette.neutral.main}
                                variant="h6"
                                fontWeight="300"
                            >
                                <strong>Location:  </strong>{MyDoctor.location}
                            </Typography>
                            <Typography
                                color={palette.neutral.main}
                                variant="h6"
                                fontWeight="300"
                            >
                                <strong>Occupation:  </strong>{MyDoctor.occupation}
                            </Typography>
                            <Button variant="outlined">Chat With The Doctor</Button>
                        </>
                        : <>
                            <Typography
                                color={palette.neutral.main}
                                variant="h6"
                                fontWeight="300"
                            >
                                You Still Don't Have a Doctor Take A Test And Wait
                            </Typography>
                        </>
                }
            </Box>

        </WidgetWrapper>
    )
}
