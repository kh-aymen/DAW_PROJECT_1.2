import React from 'react'
import './Service.css'

import Header from 'components/header/Header'
import Footer from 'components/footer/Footer'
import Title from 'components/title/Title'
import { card1, card2 } from 'data/services'

function Service() {

    return (
        <>
            <Header title={'Services'} subtitle={'khalfi aymen'}></Header>
                <ServiceSection/>
            <Footer></Footer>
        </>
    )
}

export function ServiceSection() {
    return (
        <div className="section service">
            <Title title={'Our Services'} subtitle={'Learn More What We Do And Get Involved'} />
            <div className="allcards">
                <div className="cards">
                    {
                        card1.map((item,id) => {
                            return (
                                <div className='card' key={id}>
                                    <item.icon />
                                    <h1>{item.title}</h1>
                                    
                                    <p className="p">
                                        {item.body}
                                    </p>
                                    <button className='Btn'>Read More</button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="cards">
                    {
                        card2.map((item,id) => {
                            return (
                                <div className='card' key={id}>
                                    <item.icon />
                                    <h1>{item.title}</h1>
                                    <p className="p">
                                        {item.body}
                                    </p>
                                    <button className='Btn'>Read More</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Service