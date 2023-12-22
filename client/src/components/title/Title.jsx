import React from 'react'
import './Title.css'

function Title(props) {
    const { title, subtitle } = props
    return (
        <div className='title_div flexColCenter'>
            <h3>{title}</h3>
            <p>{subtitle}</p>
            
        </div>
    )
}

Title.defaultProps = {
    title: 'Title here',
    subtitle: 'SubTitle here'
}

export default Title 