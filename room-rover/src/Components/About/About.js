import React from 'react'
import "./About.css"

export default function About() {
  return (
<>
<div className="bg-bdy">
<div className="container">
  <div id="about">
    <h1 className='head-color'>Who we help</h1>

    <div className="about-section-1 my-5">
    <div className="left-about">
      
    </div>


    <div className="right-about">
    <h1 class="subtitle head-color">Renters</h1>
    <p>
   <p className='parahead my-3'> By making renting an apartment as easy as booking a hotel</p>
   <p className="paratext my-3">From browsing and touring to applying and process of renting, the entire process is becoming faster, easier, and more trustworthy on ROOM<span className='green'><strong>ROVER</strong></span></p>
    </p>
    </div>
    </div> <br /> <br />

    {/* -------------------------------- */}

    
    <div className="about-section-2 my-5">
  


    <div className="right-about-2">
    <h1 class="subtitle head-color">PROPERTY OWNERS</h1>
    <p>
   <p className='parahead my-3'> By connecting them with renters</p>
   <p className="paratext my-3">We connect property owners and  renters directly and so that they can fill more vacancies, more quickly.</p>
    </p>
    </div>

    <div className="left-about-2">
      
      </div>


    </div> <br /> <br />

    {/* ------------------------------ */}
    
    <div className="about-section-3 my-5">
  
    <div className="left-about-3">
      
      </div>

    <div className="right-about-3">
    <h1 class="subtitle head-color">PROPERTY OWNERS</h1>
    <p>
   <p className='parahead my-3'> By connecting them with renters</p>
   <p className="paratext my-3">We connect property owners and  renters directly and so that they can fill more vacancies, more quickly.</p>
    </p>
    </div>




    </div>



      {/* ------------------------------ */}
 <br /> <br />
      <h1 class="head-color">Our Purpose</h1>
      <div className="text-container-about-1">
      We create opportunity for everyone to Find A Perfect Place for Accommodation
</div>
      <div className="text-container-about-2">
      We believe finding your new apartment is more than just a move.
But today’s rental experience is broken. It’s outdated, exhausting, and slow. We spend hours of our lives searching just to settle for places that don’t feel  worthy. The nightmare ends now.
ROOM-ROVER is on a mission to change the way you rent, forever. We are building a community for both the owners and tenants to make rental experiences easier, faster, and more human. By making this vision a reality, we’re creating opportunity for everyone to live better—from one fresh start to the next.
      </div>



    
  </div>
</div>
</div>


<footer>
          <div id="footer">
            <div className="class1 class-same">Room<span className="green-1">Rover</span></div>
            <div className="class2 class-same">Resources</div>
            <div className="class3 class-same">Useful Links</div>
            <div className="class4 class-same">News Letter</div>
          </div>
        </footer>

</>
  )
}
