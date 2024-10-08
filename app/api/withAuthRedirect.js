"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import App from "@/app/api/api";
function WithAuthRedirect({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await App.get("/auth/authenticated_user/", {
          method: "GET",
          withCredentials: true,
        });

        const data = await response.data;
        if (data.authenticated == true) {
          setIsAuthenticated(true);
          router.push("/home");
        } else {
          setIsAuthenticated(false);
          router.push("/onboarding/welcome-to-medlink/auth/sign-in");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        router.push("/onboarding/welcome-to-medlink/auth/sign-in");
      }
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default WithAuthRedirect;
