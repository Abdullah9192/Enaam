import React from 'react'
import logo from "../../Assets/enaam 4.png"
const AboutSection = () => {
  return (
    <div className='container'>
        <div className="d-flex justify-content-center bg-about p-5">
        <img src={logo} alt="" className='img-fluid'  />
        </div>
        <div className='text-center px-3 py-md-5 py-3'>
            <p className='about-text px-md-4 px-2' >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <h4 className="fw-bold">If you need help or you have any questions, feel free to contact me by email.</h4>
            <h4 className='fw-bolder'><a href="mailto:info@enaam.pk">info@enaam.pk</a></h4>
        </div>
      
    </div>
  )
}

export default AboutSection
