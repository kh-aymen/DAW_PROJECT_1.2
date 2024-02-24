import React, { useState } from "react"
import { Box, Button, Typography, useTheme, IconButton } from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { Formik, Form } from "formik"
import * as yup from "yup"
import Dropzone from "react-dropzone"
import FlexBetween from "components/FlexBetween"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "state"
import WidgetWrapper from "components/WidgetWrapper"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const imageSchema = yup.object().shape({
    picture: yup.mixed().required("Please select an image"),
})

const UpdateImage = ({ userId, picturePath }) => {
    const [currentImage, setCurrentImage] = useState(picturePath || null)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const { palette } = useTheme()

    const handleImageUpdate = async (values) => {
        const formData = new FormData()
        formData.append("picture", values.picture)

        try {
            const response = await fetch(
                `https://daw-project-1-2.onrender.com/auth/UpdateImage/${userId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            )
            const Data = await response.json()


            const updatedUser = {
                ...user,
                picturePath: Data.user.picturePath,
            }

            dispatch(setUser({ user: updatedUser }))
            toast.success("The Image changed successfully", {
                position: toast.POSITION.TOP_LEFT,
            })
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error("Error updating image:", error)
        }
    }

    return (
        <WidgetWrapper>
            <Formik
                initialValues={{ picture: null }}
                validationSchema={imageSchema}
                onSubmit={handleImageUpdate}
            >
                {({ values, setFieldValue, submitForm }) => (
                    <Form>
                        <Box>
                            <FlexBetween>
                                <Typography>{currentImage ? currentImage : "No Image"}</Typography>
                                <IconButton>
                                    <EditOutlinedIcon />
                                </IconButton>
                            </FlexBetween>
                            <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) =>
                                    setFieldValue("picture", acceptedFiles[0])
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        border={`2px dashed ${palette.primary.main}`}
                                        p="1rem"
                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!values.picture ? (
                                            <p>Add Picture Here</p>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>{values.picture.name}</Typography>
                                                <EditOutlinedIcon />
                                            </FlexBetween>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                            <Button
                                type="button"
                                variant="contained"
                                sx={{ mt: "1rem" }}
                                onClick={submitForm}
                            >
                                Update Image
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </WidgetWrapper>
    )
}

export default UpdateImage
