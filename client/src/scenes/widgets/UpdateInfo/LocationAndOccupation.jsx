import React from "react";
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "state";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const locationAndOccupationSchema = yup.object().shape({
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
});

const LocationAndOccupation = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:640px)")


    const handleUpdatelocationAndOccupation = async (values, { resetForm }) => {
        try {
            const response = await fetch(`http://localhost:3001/users/updateLocationAndOccupation/${userId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const Data = await response.json()

            // Create a new object with the updated values
            const updatedUser = {
                ...user,
                location: Data.user.location,
                occupation: Data.user.occupation,
            };

            // Dispatch the action with the updated user
            dispatch(setUser({ user: updatedUser }));
            resetForm();
            toast.success("The location and occupation changed successfully", {
                position: toast.POSITION.TOP_LEFT,
            })
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    return (
        <Formik
            initialValues={{
                location: user.location,
                occupation: user.occupation,
            }}
            validationSchema={locationAndOccupationSchema}
            onSubmit={handleUpdatelocationAndOccupation}
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
                            label="Location"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.location}
                            name="location"
                            error={Boolean(touched.location) && Boolean(errors.location)}
                            helpertext={touched.location && errors.location}
                            sx={{ gridColumn: isNonMobileScreens ? "span 1" : undefined }}
                        />
                        <TextField
                            label="Occupation"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.occupation}
                            name="occupation"
                            error={
                                Boolean(touched.occupation) && Boolean(errors.occupation)
                            }
                            helpertext={touched.occupation && errors.occupation}
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

export default LocationAndOccupation;
