import React from 'react'
import Button from '@mui/material/Button';
function ButtonCo(props) {
    const { value } = props
    return (
        <Button variant='contained' className='Btn'>{value}</Button>
    )
}

ButtonCo.defaultProps = {
    value: 'value here'
}

export default ButtonCo