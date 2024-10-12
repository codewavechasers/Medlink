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
  const router = useRouter();
  const [isLoadingDashboard, handleDashboardClick] = useLoadingNavigation("../../../welcome-to-medlink/auth/sign-in");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      router.push('/home');
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <div className="form">
      <div className="svg-part"></div>
      <div className="form-part">
        <div className="flex-complete">
          <Heading><strong>Thank you for choosing medlink.</strong></Heading>
          <p>
            Your 2FA is successfully verified. You will be redirected to the dashboard in {countdown} seconds.
            {' '}
            <Link href="/home" onClick={handleDashboardClick}>
              {isLoadingDashboard ? (
                <>
                  <Loading small inline withOverlay={false} />
                  <span style={{ marginLeft: "8px" }}>Loading...</span>
                </>
              ) : (
                "Click here to go now"
              )}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PassswordComplete;