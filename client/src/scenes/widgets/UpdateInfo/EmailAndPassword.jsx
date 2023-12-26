import React, { useState } from "react";
import { Box, Button, TextField, useMediaQuery, InputAdornment, IconButton } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "state";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const emailAndPasswordSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required"),
});

const EmailAndPassword = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:640px)");

    const [showPassword, setShowPassword] = useState(false);

    const handleUpdateEmailAndPassword = async (values, { resetForm }) => {
        try {
            const response = await fetch(`http://localhost:3001/auth/updateEmailAndPassword/${userId}`, {
                method: "POST", 
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json()

            // Create a new object with the updated values
            const updatedUser = {
                ...user,
                // email: values.email,
                password: data.password,
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
                email: user.email,
                password: "",
                passwordConfirmation: "",
            }}
            validationSchema={emailAndPasswordSchema}
            onSubmit={handleUpdateEmailAndPassword}
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
                            disabled
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: isNonMobileScreens ? "span 2" : undefined }}
                        />

                        <TextField
                            label="New Password"
                            type={showPassword ? "text" : "password"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: isNonMobileScreens ? "span 1" : undefined }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            label="Confirm Password"
                            type={showPassword ? "text" : "password"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.passwordConfirmation}
                            name="passwordConfirmation"
                            error={Boolean(touched.passwordConfirmation) && Boolean(errors.passwordConfirmation)}
                            helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                            sx={{ gridColumn: isNonMobileScreens ? "span 1" : undefined }}
                        />

                        <Button type="submit" variant="contained">
                            Update
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default EmailAndPassword;
