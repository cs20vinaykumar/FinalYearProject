import React, { useState } from 'react'
import "./Signup.css" 
import { Link } from 'react-router-dom'
import axios from 'axios'
// import { useHistory } from 'react-router-dom';

export default function Signup() {
   const [user, setUser] = useState({
    name: "",
    lname: "",
    email: "",
    number: "",
    password: "",
  
   })


  const hanldechange = (e) =>{
    console.log(e.target)
const   {name, value} = e.target

setUser({
  ...user,
  [name]: value

})
 }
 
// const register = ()=>{
// const {name, lname, email, number, password} = user
// if (name && lname && email && number && password ){
//   axios.post("http://localhost:3000/Signup", user)
//   .then(res => console.log(res))
// } 
// else{
//   alert("invalid input")
// }

  
// }

const register = async () => {
  const { name, lname, email, number, password } = user;
  
  if (name && lname && email && number && password) {
    try {
      const response = await axios.post("http://localhost:3000/Signup", user);
      console.log(response.data); // Log the response data from the server
    } catch (error) {
      if (error.response) {
        console.error(error.response.data); // Log the server's error response
      } else {
        console.error(error.message); // Log a general error message
      }
    }
  } else {
    alert("Invalid input");
  }
}





  return (
<>
<div className="main-container">


<div className="main-content">
  <div className="signup">
    <h4>Create Account</h4> <br />

    <form action="" className='form-class'>
      <div className="form-group ">
      <label htmlFor="name" className='labels'>First Name:</label>
      <input type="text" name="name" value={user.name} id="name" className='inputs' placeholder='Enter Your First Name' onChange={hanldechange}  />
      </div>
      <div className="form-group">
      <label htmlFor="lname" className='labels'> Last Name:</label>
      <input type="text" name="lname" value={user.lname} id="lname" className='inputs' placeholder='Enter Your Last Name' onChange={hanldechange}/>
      </div>
      <div className="form-group">
      <label htmlFor="email" className='labels'> Email Id:</label> 
      <input type="email" name="email" value={user.email} id="email" className='inputs' placeholder='Enter Your email Id' onChange={hanldechange}/>
      </div>
      <div className="form-group">
      <label htmlFor="number" className='labels'> Number:</label>
      <input type="number" name="number" value={user.number} id="number" className='inputs' placeholder='Enter Your Phone Number' onChange={hanldechange}/>
      </div>
      <div className="form-group">
      <label htmlFor="pass" className='labels'> Password:</label>  
      <input type="password" name="password" value={user.password} id="pass" className='inputs' placeholder='Enter Your Password' onChange={hanldechange}/>
      </div>

      <div className="form-group">
      <label  className='labels'> Gender:</label>  
      <input type="checkbox"   className='inpus mx-3' />
      <div className="male">Male</div>

      <input type="checkbox"   className='inpus mx-3' />
      <div className="male">Female</div>
      


  
   
  
      </div>


     
      
    
    </form>

    <button className='btn btn-primary' onClick={register}>Register</button>  
    <p id='para-login ' className='my-3'>Already have an account ? <Link to="/Login">Login</Link></p>





  </div>
</div>
</div>


</>
  )
}
