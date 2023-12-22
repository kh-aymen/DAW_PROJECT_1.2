import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  quiz: [],
  quizResult: [],
  patient: [],
  doctor: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload.quiz
    },
    setQuizResult: (state, action) => {
      state.quizResult = action.payload.quizResult
    },
    setDoctor: (state, action) => {
      state.doctor = action.payload.doctor
    },
    setPatient: (state, action) => {
      state.patient = []
      state.patient = action.payload.patient
    },
  },
});

export const { setMode, setLogin, setLogout, setQuiz, setPatient, setDoctor, setQuizResult } =
  authSlice.actions;
export default authSlice.reducer;
