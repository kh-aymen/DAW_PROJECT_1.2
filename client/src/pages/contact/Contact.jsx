import React from 'react'
import './Contact.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Title from '../../components/title/Title'
import { Email, LocationCity, Phone } from '@mui/icons-material'


function Contact() {
    return (
        <>
            <Header title={'Contact Us'} subtitle={'khalfi aymen'}></Header>
            <ContactSection/>
            <Footer></Footer>
        </>
    )
}

export function ContactSection() {
    return (
        <div className="section contact">
            <div className="contact_header">
                <Title title={'Contact Us'} subtitle={'If You Have Any Query, Please Contact Us'}></Title>
            </div>
            <div className="contact_body">
                <div className="top">
                    <h1>Address: </h1>
                    <div>
                        <p><LocationCity />Algerai, Batna, Kechida</p>
                        <p><Email />khalfiaymen.fl@gmail.com</p>
                        <p><Phone />+213675024524</p>
                        <p><Phone />+213556573881</p>
                    </div>
                </div>
                <div className="bottom">
                    <div className="left">
                        <form action="">
                            <div>
                                <input type="text" placeholder='Your Name' />
                                <input type="email" placeholder='Your Email' />
                            </div>
                            <input type="text" placeholder='Subject' />
                            <textarea name="" id="" cols="30" rows="10" placeholder='Message' />
                            <button type='submit' className='Btn'>Send</button>
                        </form>
                    </div>
                    <div className="right">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8590.228071702963!2d6.5725044414218265!3d36.24678174636993!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f1655aaa0d63ab%3A0xa80cc72a9da3c77b!2sUniversity%20of%20Constantine%202%20-%20Abdelhamid%20Mehri!5e0!3m2!1sen!2sdz!4v1700776326591!5m2!1sen!2sdz" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='Map'></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact