import { DangerousOutlined, DeleteOutlineOutlined, PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material"
import { Box, IconButton, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setPatient } from "state"
import FlexBetween from "./FlexBetween"
import UserImage from "./UserImage"
import { useState } from "react"

const Patient = ({ patientId, userId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)
    const [isDialogOpen, setDialogOpen] = useState(false)
    const patient = useSelector((state) => state.patient)
    const Ids = { patientId, userId }

    const { palette } = useTheme()
    const primaryLight = palette.primary.light
    const primaryDark = palette.primary.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium



    const getPatient = async () => {
        await fetch(`http://localhost:3001/patients/delete`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Ids),
        })
    }

    const handleOpenDialog = () => {
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
    }
    const handleConfirm = () => {
        getPatient()
        updatePatientState()
        handleCloseDialog()
    }
    const updatePatientState = () => {
        const updatedPatient = patient.filter((patientItem) => patientItem.user._id !== userId)
        dispatch(setPatient({ patient: updatedPatient }))

    }


    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                //   onClick={() => {
                //     navigate(`/profile/${PatientId}`)
                //     navigate(0)
                //   }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer",
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            <IconButton
                onClick={handleOpenDialog}
                sx={{  p: "0.6rem" }}
            >
                <DeleteOutlineOutlined color="error" />
            </IconButton>

            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle><Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={'1rem'}>
                    Confirmation <DangerousOutlined color="error" />
                </Box></DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this Patient?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleConfirm} variant="contained" color="error">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </FlexBetween>
    )
}

export default Patient
