import React from 'react'
import Complete from "./complete"
export const metadata = {
  title: "Password Reset Complete | Medlink",
  description: "Your password has been successfully reset. You can now sign in to your Medlink account.",
};
function CompletePage() {
  return (
    <div>
      <Complete/>
    </div>
  )
}

export default CompletePage
