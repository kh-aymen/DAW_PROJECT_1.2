import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faArrowRightFromBracket, faQuestion, faUserDoctor, faHouseUser, faCirclePlus, faBell } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import './Profile.css'
import logo from '../../assets/logo.png'
import testimonial from '../../assets/testimonail.png'
import testimonialBG from '../../assets/testimonailBG.png'
import axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

function Profile() {
    const [activeSection, setActiveSection] = useState('home')

    const handleClick = (section) => {
        setActiveSection(section)
    }
    return (
        <div className='section profile'>
            <div className="sidebar">
                <div className="logo">
                    <img src={logo} alt="img" />
                </div>
                <div className="options">
                    <div className="option" onClick={() => handleClick('home')}>
                        <FontAwesomeIcon className='icon' icon={faHouseUser} />
                        <h2>Home</h2>
                    </div>
                    <div className="option" onClick={() => handleClick('doctors')}>
                        <FontAwesomeIcon className='icon' icon={faUserDoctor} />
                        <h2>Doctors</h2>
                    </div>
                    <div className="option" onClick={() => handleClick('test')}>
                        <FontAwesomeIcon className='icon' icon={faQuestion} />
                        <h2>Take Test</h2>
                    </div>
                    <div className="option" onClick={() => handleClick('settings')}>
                        <FontAwesomeIcon className='icon' icon={faGear} />
                        <h2>Settings</h2>
                    </div>
                    <div className="option" onClick={() => handleClick('logout')}>
                        <FontAwesomeIcon className='icon' icon={faArrowRightFromBracket} />
                        <h2>Log Out</h2>
                    </div>
                </div>
            </div>



            {
                activeSection === 'home' && <div className="content">
                    <div className="hiandnotif">
                        <h3>Hi Mr. Mahfoud,</h3>
                        <FontAwesomeIcon className='icon' icon={faBell} />
                    </div>
                    <div className="first">
                        <div className="pfp">
                            <img src={testimonial} alt="img" />
                            <h1>MEHALLI Mahfoud Bahaeddine</h1>
                            <button className='Btn'>Edit Profile</button>
                        </div>

                        <div className="nexttopfp">
                            <div className="txt">
                                <h2>Healthy doesn't have to be hard</h2>
                                <button className='Btn'>Register Now</button>
                            </div>
                            <div className="idk"></div>
                        </div>
                    </div>
                    <h3>Read more articles</h3>
                    <div className="articles">
                        <div className="article">
                            <img src={testimonialBG} alt="" />
                            <div className="articleinfo">
                                <h1>Lorem ipsum dolor sit amet.</h1>
                                <p>by bahaeddine</p>
                                <a href="#"><FontAwesomeIcon className='icon' icon={faCirclePlus} />Read full article</a>
                            </div>
                        </div>
                        <div className="article">
                            <img src={testimonialBG} alt="" />
                            <div className="articleinfo">
                                <h1 className="aricletitle">Lorem ipsum dolor sit amet.</h1>
                                <p className="articleauther">by bahaeddine</p>
                                <a href="#"><FontAwesomeIcon className='icon' icon={faCirclePlus} />Read full article</a>
                            </div>
                        </div>
                        <div className="article">
                            <img src={testimonialBG} alt="" />
                            <div className="articleinfo">
                                <h1 className="aricletitle">Lorem ipsum dolor sit amet.</h1>
                                <p className="articleauther">by bahaeddine</p>
                                <a href="#"><FontAwesomeIcon className='icon' icon={faCirclePlus} />Read full article</a>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                activeSection === 'doctors' &&
                <div>Doctors Content</div>
            }
            {
                activeSection === 'test' &&
                <div>Test Content</div>}
            {
                activeSection === 'settings' &&
                <div className="Settings_content">
                    <div className="picture">
                        <img src={testimonial} alt="" />
                        <div className="">
                            <h3>Mr. MEHALLI Mahfoud Bahaeddine</h3>
                            <h4>Male, 20 yo.</h4>
                        </div>
                    </div>
                    <div className="infos">
                        <SignupSection />
                    </div>
                </div>
            }
            {
                activeSection === 'logout' &&
                <div>Logout Content</div>
            }

        </div>
    )
}


const SignupSection = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [passwordVal, setPasswordVal] = useState('');

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangeGender = (e) => {
        setGender(e.target.value);
    };

    const onChangeBirthday = (e) => {
        setBirthday(e.target.value);
    };

    const onChangePassword = (e) => {
        setPasswordVal(e.target.value);
    };

    const onChangeRole = (e) => {
        setRole(e.target.value);
    };

    const signupFunc = (e) => {
        e.preventDefault()

        const userInfo = {
            nom: firstName,
            prenom: lastName,
            genre: gender,
            date_de_Naissance: birthday,
            role: role,
            email: email,
            mot_de_Passe: passwordVal,
        }

        console.log(userInfo)
        // axios
        //     .post('http://localhost:5000/signup', userInfo)
        //     .then((res) => console.log(res.data))
        //     .catch((err) => console.log('Error' + err));

        // window.location = '/Login';
    }

    return (
        <form onSubmit={signupFunc}>
            <div className="name">
                <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={firstName}
                    onChange={onChangeFirstName}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={lastName}
                    onChange={onChangeLastName}
                />
            </div>
            <div className="sexANDdate">
                <select required value={gender} onChange={onChangeGender}>
                    <option value="Male" hidden>
                        Your Gender ?
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input
                    type="date"
                    required
                    value={birthday}
                    onChange={onChangeBirthday}
                />
            </div>
            <div className="sexANDdate">
                <select required value={role} onChange={onChangeRole}>
                    <option value="" hidden>
                        Who you are ?
                    </option>
                    <option value="Patinet">Patinet</option>
                    <option value="Doctor">Doctor</option>
                </select>
            </div>
            <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={onChangeEmail}
            />
            <div className="Visibility">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    required
                    minLength={8}
                    value={passwordVal}
                    onChange={onChangePassword}
                />
                <p>
                    See Password{' '}
                    {showPassword ? (
                        <VisibilityIcon onClick={handleTogglePasswordVisibility} />
                    ) : (
                        <VisibilityOffIcon onClick={handleTogglePasswordVisibility} />
                    )}
                </p>
            </div>
            <button className="Btn">Update</button>
        </form>
    );
}



export default Profile