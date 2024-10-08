import React from "react";
import SignIn from "./index.js";
import "./styles.scss";
import WithAuthRedirect from "@/app/api/withAuthRedirect.js";
export const metadata = {
  title: "Sign In | Medlink",
  description: "Sign in to your Medlink account to access your healthcare services and manage your appointments.",
};
function page() {
  return (
    <div>
      <WithAuthRedirect>
        <SignIn />
      </WithAuthRedirect>
    </div>
  );
}

export default page;
