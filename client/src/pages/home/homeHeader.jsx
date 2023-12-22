import React from 'react'
import './homeHeader.css'
import Navbar from '../../components/navbar/Navbar'
import landingPage from '../../assets/landingPage.png'
// import Typewriter from 'typewriter-effect'

function Homeheader() {
    return (
        <div className='section Homeheader '>
            <Navbar />
            <div className="contnet">
                <div className="left">
                    <h1>
                        {/* <Typewriter options={{
                            strings: [`WELCOME TO OUR PROGRAM`]
                            , autoStart: true, loop: true
                        }} /> */}
                        WELCOME TO OUR<br />PROGRAM
                    </h1>
                    <p>
                        if you feel like gaming is taking your time , take our test , take our test you are an sdnsjad
                    </p>
                    <p>
                        if you feel like gaming is taking your time if you feel like gaming is taking your time namdp1wwdas
                    </p>
                    <button className='Btn'>Take Test</button>
                </div>
                <div className="right">
                    <img src={landingPage} alt="img" />
                </div>
            </div>
        </div>
    )
}

export default Homeheader