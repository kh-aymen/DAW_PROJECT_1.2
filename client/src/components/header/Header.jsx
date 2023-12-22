import React from 'react'
import './Header.css'
import Navbar from 'components/navbar/Navbar'



function Header(props) {
    const { title, subtitle } = props
    return (
        <div className='section header flexColCenter'>
            <Navbar />
            <section className='flexColCenter'>
                <div>
                    <h1>{title}</h1>
                    <div className='hr'></div>
                </div>
                <p className='p'>{subtitle}</p>
            </section>
        </div>
    )
}

Header.defaultProps = {
    title: 'Title here',
    subtitle: 'SubTitle here'
}

export default Header
