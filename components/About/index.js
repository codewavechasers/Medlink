import React from 'react'
import './styles.scss'
import { Heading } from '@carbon/react'
function About() {
  return (
    <div className='about-content'>
        <div className='about-svg'></div>
        <div className='about-text'>
            <div className='about-title'>
            <Heading>About Medlink</Heading>
            <p>Your virtual Medical Clinic</p>
            </div>
            <div>
                <Heading>Visit our page to know more about us,.....</Heading>
            </div>
        </div>
    </div>
  )
}

export default About
