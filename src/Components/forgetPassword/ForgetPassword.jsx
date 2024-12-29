import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "../../Components/SignUp/SignUp.css";

export default function ForgetPassword() {
    
    const [form,setForm] = useState({
        "id" : '',
        "firstName" : '',
        "lastName" : '',
        "email" : '',
        "phone" : '',
        "password" : '',
        "role" : '',
        "reservations" : []
    })

    const [confirmedPassword, setConfirmedPassword] = useState('');
    const location = useLocation();
    
    const navigate = useNavigate();


    // check if user pass a valid email 
    useEffect(() => {
      // Access the email passed via state
      const email = location.state?.email; 
      console.log("email : " +  email);
      
      if (email) {
        setForm((prevForm) => ({
          ...prevForm,
          email: email,
        }));
    
        const fetchUser = async () => {
          try {
            const response = await fetch("http://localhost:8082/api/utilisateur/checkuserbyemail", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ email }),
            });
    
            if (response.ok) {
              const userExist = await response.text();
    
              if (!userExist) {
                alert("User not found, create an account");
                navigate("/login");
              } else {
                const objectUser =  JSON.parse(userExist);
                console.log("nnn" + userExist);
                console.log("type of userexist " + typeof(userExist));
                console.log("type of objectuser : " + objectUser);
                
                setForm(objectUser);
                console.log("user found : " + form.id);
                
              }
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchUser();
      }else {
        alert("No email found ")
        navigate("/login")
      }
    }, []);
    
    const handelForm = (event) => {
      const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    }

      const handelConfirmButton = async (event)=> {
      event.preventDefault();
      console.log("the form after clikink confirm" + form.id);
      
      if (confirmedPassword != form.password) {
        alert("Password Mismatch")
        navigate(0);
      }else {
        try {
          const url = `http://localhost:8082/api/utilisateur/${form.id}`;
          console.log(url);
          
          const response = await fetch(`http://localhost:8082/api/utilisateur/${form.id}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              
              body: JSON.stringify(form)
          });
              if (response.ok) {
                alert("Your password has been modified with succes");
                navigate("/login"); 
              }else {
                console.log(await response.text());
              }
          
      } catch (error) {
          console.log(error);
      }
      }
    }
      
  return (   
    <>
   <section className='sctlogin'>
            <div className="maine">
                <input className='inpute' type="checkbox" id="chk" aria-hidden="true" />

                <div className="signupe">
                    <form>
                        <label htmlFor="chk" aria-hidden="true" className='labele'>
                            <p className='change-passwd-title'> Change your password </p>
                        </label>
                        <div className='forget-passwd-input-container'>
                            <input className='inpute' type="email" name="email" value={form.email} readOnly contentEditable="false"/>
                            <input className='inpute' type="password" name="password" placeholder="Password" required onChange={handelForm}/>
                            <input className='inpute' type="password" name="confirmedPassword" placeholder="Confirm Password" required onChange={(event) => {setConfirmedPassword(event.target.value)}}/>
                            <button className='btnlogin' onClick={handelConfirmButton}>Confirm Changes</button>
                        </div>
                    </form>
                </div>

               
            </div>
        </section>
     
    </>
  )
}
