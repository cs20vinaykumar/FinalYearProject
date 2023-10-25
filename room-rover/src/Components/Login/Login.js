import React, { useState } from 'react'
import "./Login.css"
import axios  from 'axios'
import { Link, useNavigate  } from 'react-router-dom'
// import { useHistory } from 'react-router-dom';

export default function Login(props) {


  const navigate = useNavigate ();






  const [user, setUser] = useState({
    email: "",
    password: ""
  
   })


  const hanldechange = (e) =>{
    console.log(e.target)
const   {name, value} = e.target

setUser({
  ...user,
  [name]: value

})
  }




const login = () => {
  axios.post("http://localhost:3000/login", user)
    .then((res) => {
      alert(res.data.message);
      
      if (res.data.message === 'Login Successful') {
        navigate('/Dashboard'); 
      }
    })

};






  return (
<>
<div className="main-container">


<div className="main-content">
  <div className="signup">
    <h4>Login</h4> <br />
    

    <form action="" className='form-class'>
      <div className="form-group ">
      <label htmlFor="email" className='labels'>Email Id</label>
      <input type="email" name="email" id="email" className='inputs'  value={user.email} placeholder='Enter your email' onChange={hanldechange}/>
      </div>

      <div className="form-group ">
      <label htmlFor="password" className='labels'>Password</label>
      <input type="password" name="password" id="password"  value={user.password} className='inputs' placeholder='Enter your password' onChange={hanldechange}/>
      </div>


      
      <div className="form-group passwords">
        <div className="labels rember">Rember me ?  <input type="checkbox"  className='inpus'/> </div>
        <div className="forgot"> <a href="/">Forgot Password ?</a></div>
       </div>


    </form>
    <br />


    <button className='btn btn-primary' onClick={login}>Login</button>  <br />
    <p id='para-login ' className='my-3 text-color'>Dont have an account ? <Link to="/Signup">Sign up</Link></p>





  </div>
</div>
</div>

</>
  )
}
