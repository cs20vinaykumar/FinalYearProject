import React from 'react'
import "./UserProfile.css"

const UserProfile = () => {
  return (
    <div>
      
<div class="profile-container">
  <div class="profile-header">
   <img src="" alt="" />
    <h2>Vinay Kumar</h2>
    {/* <p>Web Developer</p> */}
  </div>
  <div class="profile-content">
    <div class="user-details">User Profile</div>
   
     <label htmlFor="name">First Name</label>
     <input type="text" id='name' /> <br />
     <br />
     <label htmlFor="fname">Last Name</label>
     <input type="text" id='fname' /><br />
     <br />
     <label htmlFor="email">Email</label>
     <input type="email" id='email' />   <br />
     <br />
     <label htmlFor="number">Number</label>
     <input type="Number" id='number' />   <br />
     <br />
     <label htmlFor="Password">Password</label>
     <input type="Password" id='Password' />   <br />
     <br /> <br /> 
     <div className="gender">
      <label htmlFor="" className='gender-one'>gender</label>
     <label htmlFor="Male"  className='label-gender'> Male</label>
     <input type="radio" id='Male' />
     <br />
     <label htmlFor="Female" className='label-gender'>Female</label>
     <input type="radio" id='Female' /> <br />
     </div>
  <button className='btn btn-primary btn-profile'>Submit changes</button>

    
  </div>

</div>
    </div>
  )
}

export default UserProfile
