import React from 'react'
import './Defi.css'
import homeDefi from '../../assets/homeDefi.png'
import lamp from '../../assets/lamp.png'

function Defi() {
    return (
        <div className="section defi">
            <div className="left">
                <div>
                    <h1>
                        WHAT IS GAME  ADDICTION ?
                    </h1>
                    <img src={lamp} alt="img" />
                </div>
                <br />
                <p>
                    It's important to note that not everyone who plays video games is at risk of developing an addiction.
                </p>
                <br />
                <p>
                    Many people play games as a form of entertainment and recreation without experiencing negative consequences.
                </p>
                <br />
                <p>
                    However, when gaming becomes a predominant and uncontrollable activity that interferes with daily life, it may be
                </p>
                <p>
                    indicative of an addiction
                </p>
            </div>

            <div className="right">
                <img src={homeDefi} alt="img" />
            </div>
        </div>
    )
}

export default Defi