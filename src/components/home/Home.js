import React from 'react'
import './Home.css'
import {useNavigate} from 'react-router-dom'
import {Carousel} from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'

function Home() {
  let navigate=useNavigate();
  const isloggedin=useSelector(state=>state.auth.isloggedIn)
  let routeTo=()=>{
    if(isloggedin)
    {
    navigate("/createUser")
    }
    else
    navigate("/login")
  }

  return (
   <div className='home'>
    <Carousel className='m-5'>
      <Carousel.Item interval={1500}>
        <img
          className="d-block"
          
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBZroDcvk4a1iF3SUwdPezvW3qPT_Stpnc-Q&usqp=CAU"
          alt="First slide"
          width={"100%"} height={"500px"}/>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
          className="d-block "
          src="https://th.bing.com/th/id/R.3b59d2bcb6e9e6ca5e250b3701ed8bc0?rik=t0tqyCHsZfZ8YQ&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f4095230%2fimages%2fo-ORGAN-DONOR-facebook.jpg&ehk=87eUxA%2brkx10Ji%2fh9Gw%2bOfEMSTe80eEOlOd0b1bltYE%3d&risl=&pid=ImgRaw&r=0"
          alt="Second slide"
          width={"100%"} height={"500px"}/>

        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
          className="d-block "
          src="https://img-cdn.thepublive.com/fit-in/1280x960/filters:format(webp)/newsdrum-in/media/media_files/zPwoeakK6KFkaJHXwuz1.png"
          alt="Third slide"
        width={"100%"} height={"500px"}/>

        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item >
    </Carousel>

    <div className="container p-5">
    <div className="row Card1">
        <div className="col-md-6">
         <img src="https://th.bing.com/th/id/R.57f6817f913fb0d7fb1f057b41227a5c?rik=qspLoMBUG5PZFw&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f7%2fDonor-Transparent-Background.png&ehk=qf2S8c0QqDCgou9CQBv4vq6M4VAnVB8hV%2fPdJMCrUv0%3d&risl=&pid=ImgRaw&r=0" width="700px" height="350px" alt="picture2"/>
        </div>
        <div className="col-md-6 ">
          <div className="display-4 fs-2 fw-bold mt-5">
            Become a Donor
          </div>
          <p className="fs-5 mt-2">
          According to a survey In India every year about:

500,000 people die because of non-availability of organs, 200,000 people die due to liver disease, and 50,000 people die because of heart disease. Moreover, 150,000 people await a kidney transplant but only 5,000 get among them.

The organ donor can play a big role in saving others’ life. The organ of the donor can be transplanted to the patient who needs it urgently.
            
            
             </p>
            <button className="btn btn-dark " onClick={()=>{routeTo()}}>Start donating today</button>
        </div>
    </div>
</div>
    
<div className="container">
    <div className="row Card2">
        <div className="col-md-6 ">
            
        {/* <img src="https://cdn.w600.comps.canstockphoto.co.uk/organ-donation-word-cloud-horizon-illustration_csp46270329.jpg" width="180px" height="" className="ms-5 mt-5" alt=""/> */}
           <p className="ms-5 mt-3 fs-5">
           People of all ages can consider themselves potential organ donors. The few absolute medical contraindications to donation include HIV-positive status, active cancer, and systemic infection. Potential donors are evaluated for suitability on the basis of their medical history.
           Anyone younger than age 18 needs to have the agreement of a parent or guardian to be a donor.
           </p>
           
        </div>
        <div className="col-md-6">
            <img src="https://th.bing.com/th/id/R.3e7cc1012db1c67b8d61e94d693ecc9f?rik=9QsWtUpO10AvUA&riu=http%3a%2f%2f1.bp.blogspot.com%2f-U_7tvJf6Fbo%2fUxagcp--HEI%2fAAAAAAAAEUA%2fUv8hPbG83gs%2fs1600%2fVegan%2bOrgan%2bDonor.png&ehk=hEI7veuq%2b7ZXkLSowFucFSgxEQUtbD%2f1EE88RZLKfSw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" width="350px" height="350px"  alt="picture3"/>
        </div>
    </div>
 </div>


<div className="container">
    <div className="row mt-5 Card3">
        <div className="col-md-6 mb-5 h-350">
            <img src="https://financialtribune.com/sites/default/files/field/image/17january/12_organ.jpg"  width="500px" height="350px"className="ms-5" alt="picture5"/>
        </div>
        <div className="col-md-6 ">
            
         <div className="display-4 fs-2 fw-bold mt-5">Transform your life 
         </div>
           <p className=" mt-2 fs-5">
            Be a hero,be an Organ donor. A single organ donor has the chance to save the lives or improve the quality of life for several people.
            Transform your life by donating organs.Don't pass the baton on organ donation.
           </p>
           <button className="btn btn-dark " onClick={()=>{window.scrollTo(0,0) }}>Find out how</button>
        </div>
       
    </div>
 </div>

{/* Footer */}
{/* <div className=" p-4 pb-5 mt-5 bg-dark footer d-flex justify-content-around "  >
        <div  className="d-flex flex-column p-3">
            <a href="#" style={{textDecoration:"none",color:"grey"}}> About us</a>
            <a href="#" style={{textDecoration:"none",color:"grey"}}> Careers</a>
            <a href="#" style={{textDecoration:"none",color:"grey"}}> Feedback</a>
            <a href="#" style={{textDecoration:"none",color:"grey"}}> Contact Us</a>
        </div>
        <div className="d-flex flex-column p-3">
            <a href="#" style={{textDecoration:"none",color:"grey"}}> Privacy Policy</a>
            <a href="#" style={{textDecoration:"none",color:"grey"}}> Terms and Conditions</a>
            <a href="#" style={{textDecoration:"none",color:"grey"}}> Copyright Policy</a>
        </div>
        <div className="d-flex flex-column p-3">
            <a href="#" style={{textDecoration:"none",color:"grey"}}> Disclaimer</a>
            <a href="#" style={{textDecoration:"none",color:"grey"}}> Sitemap</a>
            <a href="#" style={{textDecoration:"none",color:"grey"}}> Donors</a>
            <a href="#" style={{textDecoration:"none",color:"grey"}}> Research</a>
        </div>
        <div className="d-flex flex-column p-3">
            <a href="#" style={{textDecoration:"none",color:"grey"}}> Helpline</a>
            <a href="#" style={{textDecoration:"none",color:"grey"}}> Blog</a>
            <a href="#" style={{textDecoration:"none",color:"grey"}}> Acknowledgements</a>
            <a href="#" style={{textDecoration:"none",color:"grey"}}> Services</a>
        </div>
        <img src="https://thumbs.dreamstime.com/b/mobile-173831891.jpg" width={"50px"} height={"50px"} alt="" className="mt-5" />
            <img src="https://w0.peakpx.com/wallpaper/373/245/HD-wallpaper-instagram-black-logo-thumbnail.jpg" width={"50px"} height={"80px"}alt="" className="mt-5"/>
    </div> */}

    


    </div>
  )
}



export default Home