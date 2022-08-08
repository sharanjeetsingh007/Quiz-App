import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

function Header() {

    const navigate = useNavigate();
    const toHome = () => {
        navigate("/")
    }
    return (
        <div className='header'>
            <div className='header__main'>
                <div className='heading'
                ><p onClick={toHome}>Quiz<span>z</span>{" "}zie</p></div>
                <div className='wave'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 1400 292" preserveAspectRatio="none">
                        <path fill="#273036" fillOpacity="0.9" d="M0,256L48,234.7C96,213,192,171,288,165.3C384,160,480,192,576,218.7C672,245,768,267,864,256C960,245,1056,203,1152,170.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </div>

        </div>
    )
}

export default Header