import React from 'react'
import './Footer.css'
import logo from '../../assets/logo.png'
import { LinkedIn, YouTube, Instagram, Twitter, LocationOn, Phone, Email, KeyboardArrowRight } from '@mui/icons-material/'
import { Link } from 'react-router-dom'
import { TextField } from '@mui/material'

function Footer() {
    const labelStyles = {
        color: 'white',
    }

    return (
        <section className="section flexColCenter footer">
            <div className="flexCenter top">
                <div className="flexCenter top-right">
                    <div>
                        <img src={logo} alt="logo" />
                        <p className="p">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque perspiciatis officia magni vel? Cumque, ullam labore officiis sequi ipsa ex?
                        </p>
                        <div className="media">
                            <LinkedIn />
                            <YouTube />
                            <Instagram />
                            <Twitter />
                        </div>
                    </div>
                    <div>
                        <h1>Adrress</h1>
                        <p className="p"> <LocationOn /> Algerai, Batna, Kechida</p>
                        <p className="p"> <Phone /> +213556573881</p>
                        <p className="p"> <Email /> khalfiaymen.fl@gmail.com</p>
                    </div>
                </div>
                <div className="flexCenter top-left">
                    <div>
                        <h1>Quick Links</h1>
                        <ul>
                            <li> <Link to='' ><KeyboardArrowRight />Home</Link> </li>
                            <li> <Link to='' ><KeyboardArrowRight />Contact Us</Link> </li>
                            <li> <Link to='' ><KeyboardArrowRight />About Us</Link> </li>
                            <li> <Link to='' ><KeyboardArrowRight />Services</Link> </li>
                        </ul>
                    </div>
                    <div>
                        <h1>Newsletter</h1>
                        <p className="p">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                        <form action="">
                            <TextField id="outlined-basic" label="Your Email" variant="standard" inputProps={{ style: labelStyles }} required type='email' />
                            <button className="Btn" type='submit'>SignIn</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="bottom">
                <div className="hr" />
                <div className="rights">
                    <p className="p">@<strong>Khalfi Aymen</strong>, All Right Reserved.</p>
                    <div className="p">Designed By <strong>Khalfi Aymen</strong></div>
                </div>
            </div>
        </section>
    )
}

export default Footer