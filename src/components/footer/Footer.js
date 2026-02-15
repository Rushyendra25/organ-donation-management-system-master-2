import React from 'react'
import './Footer.css'

function Footer() {
  return (
 <div className=" p-4 pb-5 bg-dark footer d-flex justify-content-around "  >
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
        {/* <img src="https://thumbs.dreamstime.com/b/mobile-173831891.jpg" width={"50px"} height={"50px"} alt="" className="mt-5" />
            <img src="https://w0.peakpx.com/wallpaper/373/245/HD-wallpaper-instagram-black-logo-thumbnail.jpg" width={"50px"} height={"50px"}alt="" className="mt-5"/> */}
    </div> 
  )
}

export default Footer