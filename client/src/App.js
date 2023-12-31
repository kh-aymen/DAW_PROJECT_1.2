import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import PatientHome from "scenes/homePage/Patient"
import DoctorHome from "scenes/homePage/Doctor"
import AdminHome from "scenes/homePage/Admin"
import LoginPage from "scenes/loginPage"
import ProfilePage from "scenes/profilePage"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "./theme"
import Home from "pages/home/Home"
import About from "pages/about/About"
import Contact from "pages/contact/Contact"
import Error from "pages/error/Error"
import Service from "pages/service/Service"
import Team from "pages/team/Team"
import Testimonial from "pages/testimonial/Testimonial"
import './App.css'
import QuizForm from "scenes/widgets/QuizWidget"
import QuestionForm from "scenes/widgets/QuestionForm"
import ShowPatient from "scenes/widgets/ShowPatient"
import ShowDoctors from "scenes/widgets/ShowDoctors"
import DoctorAccess from "scenes/widgets/DoctorAccess"
import { DoctorsPatinetComp } from "scenes/widgets/DoctorsPatinetComp"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route
              path="doctor/patietnt/data/:userId"
              element={isAuth ? <ProfilePage from="doctor" /> : <Navigate to="/login" />}
            />
            <Route
              path="/home/patient"
              element={isAuth ? <PatientHome /> : <Navigate to="/login" />}
            />
            <Route
              path="/home/patient/test"
              element={isAuth ? <QuizForm /> : <Navigate to="/home/patient" />}
            />
            <Route
              path="/home/doctor"
              element={isAuth ? <DoctorHome /> : <Navigate to="/login" />}
            />
            <Route
              path="/home/doctor/addTestOrQuesiton"
              element={isAuth ? <QuestionForm /> : <Navigate to="/login" />}
            />
            <Route
              path="/home/doctor/MyPatient"
              element={isAuth ? <DoctorsPatinetComp /> : <Navigate to="/login" />}
            />
            <Route
              path="/home/doctor/patients"
              element={isAuth ? <ShowPatient from="doctor" /> : <Navigate to="/login" />}
            />
            <Route
              path="/home/admin"
              element={isAuth ? <AdminHome /> : <Navigate to="/login" />}
            />
            <Route
              path="/home/admin/patients"
              element={isAuth ? <ShowPatient /> : <Navigate to="/login" />}
            />
            <Route
              path="/home/admin/doctors"
              element={isAuth ? <ShowDoctors /> : <Navigate to="/login" />}
            />
            <Route
              path="/home/admin/access"
              element={isAuth ? <DoctorAccess /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/error" element={<Error />} />
            <Route path="/service" element={<Service />} />
            <Route path="/team" element={<Team />} />
            <Route path="/testimonial" element={<Testimonial />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
