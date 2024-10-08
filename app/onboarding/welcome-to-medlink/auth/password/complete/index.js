import { Heading, Loading } from "@carbon/react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const useLoadingNavigation = (path) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(path);
  };

  return [isLoading, handleClick];
};

function PasswordComplete() {
  const [isLoadingSignIn, handleSignInClick] = useLoadingNavigation("../../../welcome-to-medlink/auth/sign-in");

  return (
    <div className="form">
      <div className="svg-part"></div>
      <div className="form-part">
        <div className="flex-complete">
          <Heading><strong>Thank you for choosing medlink.</strong></Heading>
          <p>
            Your password has successfully been changed. You will receive a
            notification concerning this. You may proceed to sign in{" "}
            <Link href="../../../welcome-to-medlink/auth/sign-in" onClick={handleSignInClick}>
              {isLoadingSignIn ? (
                <>
                  <Loading small inline withOverlay={false} />
                  <span style={{ marginLeft: "8px" }}>Loading...</span>
                </>
              ) : (
                "here"
              )}
            </Link>
            . Thank you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PasswordComplete;