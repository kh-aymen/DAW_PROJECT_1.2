import React from 'react'
import './Team.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Title from '../../components/title/Title'
import { team } from '../../data/team'
import { GitHub, Instagram, LinkedIn } from '@mui/icons-material'
function Team() {
    return (
        <>
            <Header title={'Team'} subtitle={'khalfi aymen'}></Header>
            <TeamSection />
            <Footer></Footer>
        </>
    )
}
export function TeamSection() {
    return (
        <div className="section team">
            <Title title={'Team Members'} subtitle={`Let's Meet With Our Ordinary Soldiers`} />
            <div className="content">
                {
                    team.map((item,id) => {
                        return (
                            <div className="member" key={id}>
                                <img src={item.img} alt="img" />
                                <div>
                                    <h1>{item.name}</h1>
                                    <span>{item.job}</span>
                                    <div className="icons">
                                        <a href={item.instagram}>
                                            <Instagram />
                                        </a>
                                        <a href={item.github}>
                                            <GitHub />
                                        </a>
                                        <a href={item.linkedIn}>
                                            <LinkedIn />
                                        </a>


                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Team