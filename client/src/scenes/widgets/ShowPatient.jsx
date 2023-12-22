import { Box, Typography, useTheme, InputAdornment, Input, IconButton } from "@mui/material";
import Patient from "components/Patient";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPatient } from "state";
import SearchIcon from "@mui/icons-material/Search";
import FlexBetween from "components/FlexBetween";

const ShowPatient = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const patient = useSelector((state) => state.patient);
  const [searchTerm, setSearchTerm] = useState("");

  const getPatient = useCallback(async () => {
    const response = await fetch(`http://localhost:3001/patients/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    dispatch(setPatient({ patient: data }));
  }, [dispatch, token]);

  useEffect(() => {
    getPatient();
  }, [getPatient]);

  const filteredPatient = patient.filter(
    (p) =>
      p.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedPatient = filteredPatient.slice(0, 3);

  console.log(patient)
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >
          Patients List
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: "1rem" }}>
          <Input
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </FlexBetween>

      <Box display="flex" flexDirection="column" gap="1.5rem" mt={'1.5rem'} >
        {displayedPatient.map((patient) => (
          <Patient
            key={patient._id}
            patientId={patient._id}
            userId={patient.user._id}
            name={`${patient.user.firstName} ${patient.user.lastName}`}
            subtitle={patient.user.occupation}
            userPicturePath={patient.user.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default ShowPatient;
