import React from "react";
import { Box, Button, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "state";

const genderAndBirthdaySchema = yup.object().shape({
    gender: yup.string().required("Gender is required"),
    birthday: yup.date().required("Birthday is required"),
    role: yup.date().required("Birthday is required"),
});

const GenderAndBirthdayForm = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);

    const handleUpdateGenderAndBirthday = async (values, { resetForm }) => {
        try {
            const response = await fetch(`http://localhost:3001/users/here#####################################/${userId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Update failed");
            }

            // Create a new object with the updated values
            const updatedUser = {
                ...user,
                gender: values.gender,
                birthday: values.birthday,
            };

            // Dispatch the action with the updated user
            dispatch(setUser({ user: updatedUser }));
            resetForm();
            window.location.reload();
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    return (
        <Formik
            initialValues={{
                gender: user.gender,
                birthday: new Date(user.birthday).toLocaleDateString(),
                role: user.role
            }}
            validationSchema={genderAndBirthdaySchema}
            onSubmit={handleUpdateGenderAndBirthday}
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
                        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                    >

                        <FormControl sx={{ flex: '1' }}>
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
                            style={{ flex: '1' }}
                        />
                        <FormControl sx={{ gridColumn: "span 2" }} >
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
                                helperText={touched.role && errors.role}

                            >
                                <MenuItem value="Patient">Patient</MenuItem>
                                <MenuItem value="Doctor">Doctor</MenuItem>
                                {/* <MenuItem value="Admin">Admin</MenuItem> */}
                            </Select>
                        </FormControl>

                        {/* <Button type="submit" variant="contained">
                            Update
                        </Button> */}
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default GenderAndBirthdayForm;
