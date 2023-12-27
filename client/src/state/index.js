import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  mode: "light",
  user: null,
  token: null,
  quiz: [],
  patient: [],
  doctor: [],
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"
    },
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setUser: (state, action) => {
      state.user = action.payload.user
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload.quiz
    },
    setDoctor: (state, action) => {
      state.doctor = action.payload.doctor
    },
    setPatient: (state, action) => {
      state.patient = []
      state.patient = action.payload.patient
    },
  },
})

export const { setMode, setLogin, setLogout, setQuiz, setPatient, setDoctor, setUser } =
  authSlice.actions
export default authSlice.reducer
