import React from 'react'
import './styles.scss'
function OnboardingHeader({children}) {
  return (
    <section className='onboarding-header'>
      {children}
    </section>
  )
}

export default OnboardingHeader
