import React from 'react'
import "./Forgot.css"
import { Link } from "react-router-dom";

export default function Forgot() {
  return (
  <>
  
  <div className="main-container">


<div className="main-content">
  <div className="signup">
   <div className="image" id='svgimg'> 

   </div>
    <h4>Forgot Password</h4> <br />

    <h6>Enter the email address associated with your account and we'll send you a code to reset your password</h6>

 <div className="email">   
<h5>Email</h5>
    <input type="text" className='email-input' />
    <button class="continue-forgot-password"> <Link to="/Code" className='continue-link'>Continue</Link></button>

    </div>

    <p>Don't have an account? <span class="sign-up"><Link to="/Signup">Sign up</Link></span></p>
 
    

   





</div>
</div>
  </div>
  
  
  
  </>
  )
}
