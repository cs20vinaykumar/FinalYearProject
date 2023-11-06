import React from 'react'
import "./Code.css"
import { Link } from "react-router-dom";

export default function Code() {
  return (
    <>
    <div className="main-container">
    
    
    <div className="main-content">
      <div className="signup">
       <div className="image" id='svgimg'> 
    
       </div>
        <h4>Enter the Code</h4> <br />
    
        <h6>Enter the code sent to your email address you have provided to reset the password of your account</h6>
    
     <div className="code">   
    <h5>Code</h5>
        <input type="text" className='code-input' />
    
        <Link to="/Newpass" className='continue-link'><button class="continue-code">Continue</button></Link>
     
        </div>
    
        <p>Don't have an account? <span class="sign-up"><Link to="/Signup">Sign up</Link></span></p>
     
        
    
       
    
    
    
    
    
    </div>
    </div>
      </div>
    
    </>
  )
}
