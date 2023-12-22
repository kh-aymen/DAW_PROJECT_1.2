import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu'
import { Collapse } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

function Navbar() {
    const isSmallScreen = useMediaQuery('(max-width:1200px)')
    const [isDrawerOpen, setDrawerOpen] = useState(false)

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev)
    }

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }



    return (
        <>
            {isSmallScreen ?
                <div className='minunavb navbar flexColCenter section '>
                    <div className="logo logoRes">
                        <img src={logo} alt="logo" />
                        {isDrawerOpen?<CloseIcon onClick={toggleDrawer} />:<MenuIcon onClick={toggleDrawer} />}

                    </div>

                    <Collapse in={isDrawerOpen}>
                        <div className="nav">
                            <ul className='flexColCenter minul'>
                                <li> <Link to='/' >Home</Link> </li>
                                <li> <Link to='/about' >About Us</Link> </li>
                                <li>
                                    <Link to='' id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}>Pages</Link>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        PaperProps={{
                                            style: {
                                                background: 'rgba(221, 217, 217, 0.22)',
                                                backdropFilter: 'blur(7.5px)',
                                                marginTop: '10px',

                                            },
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <Link to='/Service'>Service</Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link to='/team'>Our Team</Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link to='/Testimonial'>Testimonial</Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link to='/Error'>Error page</Link>
                                        </MenuItem>
                                    </Menu>
                                </li>
                                <li> <Link to='/Contact' >Contact Us</Link> </li>
                                <li> <Link to='/LogIn' className="Btn" >LogIn</Link> </li>

                            </ul>
                        </div>
                    </Collapse>
                </div>
                :

                <div className='navbar flexCenter section'>
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="nav">
                        <ul className='flexCenter'>
                            <li> <Link to='/' >Home</Link> </li>
                            <li> <Link to='/About' >About Us</Link> </li>
                            <li>
                                <Link to='' id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}>Pages</Link>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    PaperProps={{
                                        style: {
                                            background: 'rgba(221, 217, 217, 0.22)',
                                            backdropFilter: 'blur(7.5px)',
                                            marginTop: '10px',

                                        },
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Link to='/Service'>Service</Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Link to='/Team'>Our Team</Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Link to='/Testimonial'>Testimonial</Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Link to='/Error'>Error page</Link>
                                    </MenuItem>
                                </Menu>
                            </li>
                            <li> <Link to='/Contact' >Contact Us</Link> </li>
                            <li> <Link to='/LogIn' className="Btn" >LogIn</Link> </li>
                        </ul>
                    </div>
                </div>
            }
        </>

    )
}

export default Navbar