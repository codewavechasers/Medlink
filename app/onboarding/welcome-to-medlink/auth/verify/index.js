import { Heading, Link } from "@carbon/react";
import React from "react";

function Verification() {
  return (
    <div className="form">
      <div className="form-part">
        <Heading> <strong>Your account is successfully verified</strong></Heading>
        <p>
          You can visit your dashboard{" "}
          <Link href="../../welcome-to-medlink/auth/sign-in">here</Link>
        </p>
      </div>
      <div className="svg-part"></div>
    </div>
  );
}

export default Verification;
