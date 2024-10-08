import React from 'react'
import Forgot from "./forgot"
export const metadata = {
  title: "Forgot Password | Medlink",
  description: "Recover your Medlink account by entering your registered email to receive a password reset link.",
};
function ForgotPage() {
  return (
    <div>
      <Forgot/>
    </div>
  )
}

export default ForgotPage
