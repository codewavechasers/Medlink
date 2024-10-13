import { Heading, Link } from "@carbon/react";
import React from "react";

function Verification() {
  return (
    <div className="form-verify">
      <div className="form-part-verify">
        <Heading> <strong>Your account is successfully verified</strong></Heading>
        <p>
          You can visit your dashboard{" "}
          <Link href="../../welcome-to-medlink/auth/sign-in">here</Link>
        </p>
      </div>
      <div className="svg-part-verify"></div>
    </div>
  );
}

export default Verification;
