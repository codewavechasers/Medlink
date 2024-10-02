import { Heading, Loading } from "@carbon/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const useLoadingNavigation = (path) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(path);
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return [isLoading, handleClick];
};

function PassswordComplete() {
  const [isLoadingDashboard, handleDashboardClick] = useLoadingNavigation("../../../welcome-to-medlink/auth/sign-in");

  return (
    <div className="form">
      <div className="svg-part"></div>
      <div className="form-part">
        <div className="flex-complete">
          <Heading><strong>Thank you for choosing medlink.</strong></Heading>
          <p>
            Your 2FA is successfully verified. You may proceed to the dashboard{" "}
            <Link href="../../../welcome-to-medlink/auth/sign-in" onClick={handleDashboardClick}>
              {isLoadingDashboard ? (
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

export default PassswordComplete;