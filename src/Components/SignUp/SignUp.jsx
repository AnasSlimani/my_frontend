import React, { useState, useEffect } from 'react';
import "./SignUp.css";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../context/AuthContext';

export default function SignUp() {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const [signUpForm, setSignUpForm] = useState({
        "firstName" : '',
        "lastName" : '',
        "email" : '',
        "phone" : '',
        "password" : '',
        "role" : "CLIENT"
    })

    const [confirmedPassword, setConfirmedPassword] = useState('');

    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/signup');
        }
    }, [isAuthenticated, navigate]);

    const handelLoginForm = (event) => {
        const { name, value } = event.target;
        setLoginForm({
            ...loginForm,
            [name]: value
        });
    };

    const handelSignupForm = (event) => {
        const {name, value} = event.target;
        setSignUpForm({
            ...signUpForm,
            [name]: value
        });        
    };

    const handelLogInButton = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8082/api/utilisateur/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginForm)
            });

            if (response.ok) {
                const token = await response.text();
                login(token);
                const decodedToken = jwtDecode(token);
                const role = decodedToken.role;
                if (role === "ADMIN"){
                    navigate("/admin")
                } else {
                    navigate("/signup")
                }
            } else if (response.status === 401) {
                alert("User not found");
                navigate(0);
            }
        } catch (error) {
            console.error("Error while logging in:", error);
            if (error.response && error.response.status === 401) {
                alert("Unauthorized access. Redirecting to login...");
                navigate("/login");
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    const handelSignUpButton = async (e) => {
        e.preventDefault();
        if (confirmedPassword !== signUpForm.password) {
            alert("Password Mismatch")
            navigate(0);
        }
        else {
            try {
                const response = await fetch("http://localhost:8082/api/utilisateur/checkuserbyemail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(signUpForm)
                });
                if (response.ok) {
                    const userExist = await response.text();
                    if (userExist === "true") {
                        alert("User already exist !!")
                        navigate(0);
                    } else {
                        try {
                            const response = await fetch("http://localhost:8082/api/utilisateur/addUser", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(signUpForm)
                            });
                            if (response.ok) {
                                alert("User added with success")
                                navigate(0)
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            } catch (error) {
                console.error("Error during sign up:", error);
            }
        }
    };

    return (
        <section className='sctlogin'>
            <div className="maine">
                <input className='inpute' type="checkbox" id="chk" aria-hidden="true" />

                <div className="signupe">
                    <form>
                        <label htmlFor="chk" aria-hidden="true" className='labele'>
                            Sign up
                        </label>
                        <div className='input-container'>
                            <div className='input-row'>
                                <input className='inpute' type="text" name="firstName" placeholder="First name" required onChange={handelSignupForm} />
                                <input className='inpute' type="text" name="lastName" placeholder="Last name" required onChange={handelSignupForm} />
                            </div>

                            <div className='input-row'>
                                <input className='inpute' type="text" name="phone" placeholder="Phone" maxLength={20} minLength={10} required onChange={handelSignupForm} />
                                <input className='inpute' type="email" name="email" placeholder="Email" required onChange={handelSignupForm} />
                            </div>

                        <div className='input-row'>
                            <input className='inpute' type="password" name="password" placeholder="Password" required onChange={handelSignupForm}/>
                            <input className='inpute' type="password" name="confirmedPassword" placeholder="Confirm Password" required onChange={(event) => {setConfirmedPassword(event.target.value)}}/>
                        </div>    
                            <button className='btnlogin' onClick={handelSignUpButton}>Sign up</button>
                        </div>
                    </form>
                </div>

                <div className="logine" >
                    <form>
                        <label htmlFor="chk" aria-hidden="true" className='labele'>
                            Login
                        </label>
                        <input className='inpute' type="email" name="email" placeholder="Email" required onChange={handelLoginForm} />
                        <input className='inpute' type="password" name="password" placeholder="Password" required onChange={handelLoginForm} />
                        <button className='btnlogin' onClick={handelLogInButton}>Log in</button>
                        
                    </form>
                    <Link to={`/forgetpassword`} 
                        state= {{ email: loginForm.email }} 
                        className='forget-password-link'> 
                            Forgot your password ?
                    </Link>
                </div>
            </div>
        </section>
    );
}

