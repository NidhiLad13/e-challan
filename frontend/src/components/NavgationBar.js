import React, { useContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie';
import context from "../Context/userContext.js";
import '../style/navbar.css'
import logo from '../assets/logo.png'



function NavigationBar() {
    const { user, logged, setLogged, nav, setNav } = useContext(context);
    useEffect(() => {
        console.log('user in nav:>> ', user);
    }, [])

    return (
        <div className={"navContainer " + nav ? "d-block" : "d-none"}>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid ">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="logo" className='logo' />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                            <li>
                                <Link class="nav-link" to="/" role="button"  >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link class="nav-link" to="/" role="button"  >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link class="nav-link" to="/" role="button"  >
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link class="nav-link" to="/" role="button"  >
                                    Contact
                                </Link>
                            </li>
                            {!logged &&
                                <li class="nav-item dropdown">
                                    <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Login
                                    </Link>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link class="dropdown-item" to="/login/admin">Admin</Link>
                                        <Link class="dropdown-item" to="/login/police">Police</Link>
                                        <div class="dropdown-divider"></div>
                                        <Link class="dropdown-item" to="/login/user">User</Link>
                                    </div>
                                </li>
                            }
                            {logged &&
                                <li class="nav-item dropdown" >
                                    <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                        <b style={{ color: 'black' }}>{Cookies.get('person')}</b>
                                    </Link>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown" >
                                        {
                                            (Cookies.get('person') === 'admin' || Cookies.get('person') === 'superAdmin') &&
                                            <Link class="dropdown-item" to="/dashboard" role="button" style={{ fontWeight: 'bold' }}> Dashboard</Link>
                                        }
                                        {
                                            Cookies.get('person') === 'police' &&
                                            <Link class="dropdown-item" to="/policeForm" role="button" style={{ fontWeight: 'bold' }}> Fill Challan</Link>
                                        }
                                        {
                                            Cookies.get('person') === 'user' &&
                                            <Link class="dropdown-item" to="/profile" role="button" style={{ fontWeight: 'bold' }}> Profile</Link>
                                        }
                                        <div class="dropdown-divider"></div>
                                        <Link class="dropdown-item" to="/logout" role="button"> Logout</Link>
                                    </div>

                                </li>
                            }

                        </ul>
                    </div>
                </div>

            </nav>


        </div>

    );
}

export default NavigationBar;