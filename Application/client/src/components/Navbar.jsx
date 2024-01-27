import React from "react";
import {Link} from 'react-router-dom'
import "../style.scss"
import Logo from "../images/logo.png"
import Logo2 from "../images/logo2.png"


const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="container">
                <div className="logo">
                    <a href="/"><img src={Logo2}></img></a> 
                </div>
                <div className="links">
                    <Link className='link' to="/">
                        <h6>Home</h6>
                    </Link>   
                    <Link className='link' to="/WealthRedistribution">
                        <h6>Redistribute</h6>
                    </Link>    
                    <Link className='link' to="/RealtimeContext">
                        <h6>Real-time</h6>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar