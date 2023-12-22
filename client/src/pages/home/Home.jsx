import React from 'react'
import './Home.css'
import Homeheader from './homeHeader'
import Defi from './Defi'
import { AbooutSection } from 'pages/about/About'
import { ServiceSection } from 'pages/service/Service'
import { TeamSection } from 'pages/team/Team'
import { TestimonailSection } from 'pages/testimonial/Testimonial'
import { ContactSection } from 'pages/contact/Contact'
import Footer from 'components/footer/Footer'




function Home() {
    return (
        <>
            <Homeheader />
            <Defi />
            <AbooutSection />
            <ServiceSection />
            <TeamSection /> 
            <TestimonailSection />
            <ContactSection />
            <Footer ></Footer>
        </>
    )
}

export default Home