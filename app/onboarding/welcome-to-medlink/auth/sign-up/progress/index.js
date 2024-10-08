"use client";
import { ProgressIndicator, ProgressStep } from "@carbon/react";
import React from "react";
import './styles.scss'
function PatientProgressSteps({ currentStep }) {
  const steps = [
    { 
      label: "Personal Information", 
      description: "Step 1: Provide your personal details including name, date of birth, gender, and contact information.", 
      complete: currentStep > 0 
    },
    { 
      label: "Emergency Information", 
      description: "Step 2: Provide your emergency information.", 
      complete: currentStep > 1
    },
    { 
      label: "Medical History", 
      description: "Step 3: Enter your current health conditions, past medical history, allergies, medications, and primary care physician details.", 
      complete: currentStep > 2 
    },
    { 
      label: "Family History", 
      description: "Step 4: List any health conditions that run in your family, such as diabetes or heart disease.", 
      complete: currentStep > 3
    },
    { 
      label: "Social History", 
      description: "Step 5: Share details about your lifestyle habits, exercise routine, and dietary habits.", 
      complete: currentStep > 4
    },
    { 
      label: "Insurance Information", 
      description: "Step 6: Provide your insurance details including provider name, policy number, and company phone number.", 
      complete: currentStep > 5
    },
    { 
      label: "Security Information", 
      description: "Step 7: Enter a strong Password for security purposes", 
      complete: currentStep > 6
    },
    { 
      label: "Consent and Authorization", 
      description: "Step 8: Give your consent for treatment and acknowledge our privacy policy (HIPAA compliance).", 
      complete: currentStep > 7
    },
  ];
  
  return (
    <ProgressIndicator vertical>
      {steps.map((step, index) => (
        <ProgressStep
          key={index}
          complete={step.complete}
          current={index === currentStep}
          label={<span className="progress-label">{step.label}</span>}
          description={step.description}
        />
      ))}
    </ProgressIndicator>
  );
}

function DoctorProgressSteps({ currentStep }) {
  const steps = [
    { 
      label: "Personal Information", 
      description: "Step 1: Provide your personal details including name, date of birth, gender, and contact information.", 
      complete: currentStep > 0 
    },
    { 
      label: "Professional Information", 
      description: "Step 2: Provide your professional information including medical license number, specialization, and years of experience.", 
      complete: currentStep > 1
    },
    { 
      label: "Work Information", 
      description: "Step 3: Enter your current workplace details, including hospital/clinic name, address, and contact information.", 
      complete: currentStep > 2 
    },
    { 
      label: "Education and Certification", 
      description: "Step 4: List your educational background, certifications, and any other relevant qualifications.", 
      complete: currentStep > 3
    },
    { 
      label: "Insurance Information", 
      description: "Step 5: Provide your insurance details including provider name, policy number, and company phone number.", 
      complete: currentStep > 4
    },
    { 
      label: "Consent and Authorization", 
      description: "Step 6: Give your consent for practice and acknowledge our privacy policy (HIPAA compliance).", 
      complete: currentStep > 5
    },
    
    { 
      label: "Security information", 
      description: "Step 6: Create a secure password and enable 2fa if necessary.", 
      complete: currentStep > 6
    },
  ];

  return (
    <ProgressIndicator vertical>
      {steps.map((step, index) => (
        <ProgressStep
          key={index}
          complete={step.complete}
          current={index === currentStep}
          label={<span className="progress-label">{step.label}</span>}
          description={step.description}
        />
      ))}
    </ProgressIndicator>
  );
}

export { PatientProgressSteps, DoctorProgressSteps };
