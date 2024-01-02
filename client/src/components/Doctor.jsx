import { DangerousOutlined, DeleteOutlineOutlined } from "@mui/icons-material"
import { Box, IconButton, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setDoctor } from "state"
import FlexBetween from "./FlexBetween"
import UserImage from "./UserImage"
import { useState } from "react"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Doctor = ({ doctorId, userId, name, subtitle, userPicturePath, birthday, email, location, createdAt }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const [isDialogOpen, setDialogOpen] = useState(false)
  const Doctor = useSelector((state) => state.doctor)
  const Ids = { doctorId, userId }
  const isNonMobileScreens = useMediaQuery("(min-width:900px)")


  const { palette } = useTheme()
  const main = palette.neutral.main
  const medium = palette.neutral.medium
  const defaultColor = palette.background.default



  const getDoctor = async () => {
    await fetch(`http://localhost:3001/doctors/delete`, {
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
    getDoctor()
    updatedoctorState()
    handleCloseDialog()
    toast.success("The Doctor has been successfully deleted", {
      position: toast.POSITION.TOP_LEFT,
    });
  }
  const updatedoctorState = () => {
    const updateddoctor = Doctor.filter((doctorItem) => doctorItem.user._id !== userId)
    dispatch(setDoctor({ doctor: updateddoctor }))

  }


  return (
    <FlexBetween
      p={'1rem 0.2rem'}
      sx={{
        "&:hover": {
          backgroundColor: defaultColor,
        },
      }}
    >
      <Box
        width={'233px'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        gap="1rem"
      >
        <UserImage image={userPicturePath} size="55px" />
        <Box
        //   onClick={() => {
        //     navigate(`/profile/${doctorId}`)
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
            {email}
          </Typography>
        </Box>
      </Box>

      {
        isNonMobileScreens &&
        <>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            flexDirection={'column'}
          >
            <Typography color={medium} fontSize="0.75rem">
              Location: {location}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              Birthday: {new Date(birthday).toLocaleDateString()}
            </Typography>
          </Box>

          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            flexDirection={'column'}
          >
            <Typography color={medium} fontSize="0.75rem">
              Occupation: {subtitle}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              Date of Account: {new Date(createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </>
      }

      <IconButton
        onClick={handleOpenDialog}
        sx={{ p: "0.6rem" }}
      >
        <DeleteOutlineOutlined color="error" />
      </IconButton>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle><Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={'1rem'}>
          Confirmation <DangerousOutlined color="error" />
        </Box></DialogTitle>
        <DialogContent>
          Are you sure you want to delete this doctor?
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

export default Doctor
