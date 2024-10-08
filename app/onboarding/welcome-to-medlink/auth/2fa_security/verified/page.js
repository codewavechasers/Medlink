import React from 'react'
import Verified from "./verified"
export const metadata = {
  title: "2FA Verified | Medlink",
  description: "Your two-factor authentication has been successfully verified. You can now access your Medlink account securely.",
};
function VerifiedPage() {
  return (
    <div>
      <Verified/>
    </div>
  )
}

export default VerifiedPage
