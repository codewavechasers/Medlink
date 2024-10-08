import React from "react";
import SignIn from "./index.js";
import "./styles.scss";
import WithAuthRedirect from "@/app/api/withAuthRedirect.js";
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
