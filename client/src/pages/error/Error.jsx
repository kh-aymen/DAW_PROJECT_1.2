import React from 'react'
import './Error.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { Dangerous } from '@mui/icons-material'
function Error() {
    return (
        <>
            <Header title={'Error'} subtitle={'khalfi aymen'}></Header>
            <ErrorSection/>
            <Footer></Footer>
        </>
    )
}

export function ErrorSection() {
    return (
        <div className="section error">
            <Dangerous />
            <h1>404</h1>
            <h1>Page Not Found</h1>
            <p className='p'>We’re sorry, the page you have looked for does not exist in our website! Maybe go to our home page or try to use a search?</p>
            <button className="Btn">Go Back To Home page</button>
        </div>
    )
}

export default Error