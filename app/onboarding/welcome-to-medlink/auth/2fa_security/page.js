import React from 'react'
import FactorAuth from "./2fa"
export const metadata = {
  title: "Two-Factor Authentication | Medlink",
  description: "Enter your two-factor authentication code to secure your Medlink account.",
};
function FA() {
  return (
    <div>
      <FactorAuth/>
    </div>
  )
}

export default FA
