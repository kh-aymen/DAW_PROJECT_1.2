// PersonalInfoForm.jsx
import React from "react"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery } from "@mui/material"
import { Formik } from "formik"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "state"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const personalInfoSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
})

const PersonalInfoForm = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.user._id)
    const token = useSelector((state) => state.token)
    const isNonMobileScreens = useMediaQuery("(min-width:640px)")


    const handleUpdatePersonalInfo = async (values, { resetForm }) => {
        try {
            const response = await fetch(`https://daw-project-1-2.onrender.com/users/updatePersonalInfoForm/${userId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            const Data = await response.json()

            // Create a new object with the updated values
            const updatedUser = {
                ...user,
                firstName: Data.user.firstName,
                lastName: Data.user.lastName,
            }
            // Dispatch the action with the updated user
            dispatch(setUser({ user: updatedUser }))
            resetForm()
            toast.success("The name changed successfully", {
                position: toast.POSITION.TOP_LEFT,
            })
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error("Update failed", error)
        }
    }

    return (
        <Formik
            initialValues={{
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                birthday: new Date(user.birthday).toLocaleDateString(),
                role: user.role
            }}
            validationSchema={personalInfoSchema}
            onSubmit={handleUpdatePersonalInfo}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="18px"
                        gridTemplateColumns={isNonMobileScreens ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"}
                    >
                        <TextField
                            label="First Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstName}
                            name="firstName"
                            error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                            helpertext={touched.firstName && errors.firstName}
                            sx={{ gridColumn: isNonMobileScreens ? undefined : "span 2" }}
                        />
                        <TextField
                            label="Last Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastName}
                            name="lastName"
                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                            helpertext={touched.lastName && errors.lastName}
                            sx={{ gridColumn: isNonMobileScreens ? undefined : "span 2" }}
                        />
                        <FormControl sx={{ gridColumn: isNonMobileScreens ? undefined : "span 2" }}>
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                disabled
                                labelId="gender-label"
                                label="Gender"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.gender}
                                name="gender"
                                error={Boolean(touched.gender) && Boolean(errors.gender)}
                                helpertext={touched.gender && errors.gender}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            disabled
                            // type="date"
                            //   label="Birthday"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.birthday}
                            name="birthday"
                            error={Boolean(touched.birthday) && Boolean(errors.birthday)}
                            style={{ gridColumn: isNonMobileScreens ? undefined : "span 2" }}
                        />
                        <FormControl sx={{ gridColumn: isNonMobileScreens ? "span 2" : "span 2" }} >
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                disabled
                                labelId="role-label"
                                label="Role"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.role}
                                name="role"
                                error={Boolean(touched.role) && Boolean(errors.role)}
                                helpertext={touched.role && errors.role}

                            >
                                <MenuItem value="Patient">Patient</MenuItem>
                                <MenuItem value="Doctor">Doctor</MenuItem>
                                {/* <MenuItem value="Admin">Admin</MenuItem> */}
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained">
                            Update
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default PersonalInfoForm
