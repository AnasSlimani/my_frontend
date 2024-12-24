import React, { useState } from 'react';
import "./SignUp.css";
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handelLoginForm = (event) => {
        const { name, value } = event.target;
        setLoginForm({
            ...loginForm,
            [name]: value
        });
    };

    const handelSignupForm = (event) => {
        // Placeholder for signup form handling logic
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
                const token = await response.text(); // Assuming token is returned as plain text
                console.log(token);
                localStorage.setItem("jwtToken", token); // Store JWT in localStorage
                
                navigate("/signup");
            } else if (response.status === 401) {
                alert("User not found");
                navigate("/login");
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
        // Placeholder for signup logic
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
                        <input className='inpute' type="text" name="txt" placeholder="User name" required onChange={handelSignupForm} />
                        <input className='inpute' type="email" name="email" placeholder="Email" required onChange={handelSignupForm} />
                        <input className='inpute' type="password" name="password" placeholder="Password" required />
                        <button className='btnlogin' onClick={handelSignUpButton}>Sign up</button>
                    </form>
                </div>

                <div className="logine">
                    <form>
                        <label htmlFor="chk" aria-hidden="true" className='labele'>
                            Login
                        </label>
                        <input className='inpute' type="email" name="email" placeholder="Email" required onChange={handelLoginForm} />
                        <input className='inpute' type="password" name="password" placeholder="Password" required onChange={handelLoginForm} />
                        <button className='btnlogin' onClick={handelLogInButton}>Log in</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
