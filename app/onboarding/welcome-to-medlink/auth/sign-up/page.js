import React from 'react'
export const metadata = {
  title: "Sign Up | Medlink",
  description: "Create a Medlink account to connect with healthcare professionals and manage your health easily.",
};
import SignUp from './index'
function page() {
  return (
    <div>
      <SignUp/>
    </div>
  )
}

export default page
