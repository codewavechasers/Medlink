"use client";
import { ProgressIndicator, ProgressStep } from "@carbon/react";
import React from "react";

function ProgressSteps({ currentStep }) {
  const steps = [
    { label: "First step", description: "Step 1: Getting started with Carbon Design System", complete: currentStep > 0 },
    { label: "Second step", description: "Step 2: Getting started with Carbon Design System", complete: currentStep > 1 },
    { label: "Third step", description: "Step 3: Getting started with Carbon Design System", complete: currentStep > 2 },
    { label: "Fourth step", description: "Step 4: Getting started with Carbon Design System", complete: currentStep > 3 },
    { label: "Fifth step", description: "Step 5: Getting started with Carbon Design System", complete: currentStep > 4 },
  ];

  return (
    <ProgressIndicator vertical>
      {steps.map((step, index) => (
        <ProgressStep
          key={index}
          complete={step.complete}
          current={index === currentStep}
          label={step.label}
          description={step.description}
        />
      ))}
    </ProgressIndicator>
  );
}

export default ProgressSteps;
