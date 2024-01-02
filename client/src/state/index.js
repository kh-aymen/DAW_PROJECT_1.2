import { createSlice } from "@reduxjs/toolkit"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
      toast.success("Loged In successfully", {
        position: toast.POSITION.TOP_LEFT,
      })
    },
    setUser: (state, action) => {
      state.user = action.payload.user
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
      toast.success("Loged Out successfully", {
        position: toast.POSITION.TOP_LEFT,
      })
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
