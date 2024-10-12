"use client";
import Swal from "sweetalert2";
import React, { useRef, useState, useEffect } from "react";
import { Button, Form, Heading, TextInput } from "@carbon/react";
import { signIn } from "next-auth/react";
import "./styles.scss";
import { useRouter } from "next/navigation";
import App from "@/app/api/api";
import Notifications from "@/components/notification/index";
const useLoadingNavigation = (path) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
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

const use2FARedirect = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const redirect2FA = (email) => {
    setIsRedirecting(true);
    Swal.fire({
      title: "Redirecting to 2FA",
      text: "Please wait while we redirect you to the 2FA verification page...",
      imageUrl: "/logov2.svg",
      imageWidth: 70,
      imageHeight: 70,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(() => {
      setIsRedirecting(false);
      Swal.close();
      router.push(
        `/onboarding/welcome-to-medlink/auth/2fa_security/?email=${encodeURIComponent(
          email
        )}`
      );
    }, 2000);
  };

  return [isRedirecting, redirect2FA];
};

function SignInForm() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    kind: "",
    caption: "",
    title: "",
    subtitle: "",
    timeout: "",
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const [isLoadingForgotPassword, handleForgotPasswordClick] =
    useLoadingNavigation("../../welcome-to-medlink/auth/password/request");
  const [isLoadingGoogleSignIn, setIsLoadingGoogleSignIn] = useState(false);
  const [isRedirecting2FA, redirect2FA] = use2FARedirect();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    Swal.fire({
      title: "Signing you in",
      text: "Please wait...",
      imageUrl: "/logov2.svg",
      imageWidth: 70,
      imageHeight: 70,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        App.post(
          "/auth/login/",
          { email, password },
          {
            withCredentials: true,
          }
        )
          .then((response) => {
            Swal.close();
            if (response.data.success) {
              if (response.data.message === "2FA code sent") {
                setNotificationProps({
                  kind: "success",
                  caption: "Please check your email",
                  title: "2FA code sent",
                  subtitle: "Redirecting to 2FA verification page...",
                  timeout: 3000, // Duration
                });
                setShowNotification(true);
                setTimeout(() => {
                  setShowNotification(false);
                  redirect2FA(email);
                }, 3000);
                redirect2FA(email);
              }
              setNotificationProps({
                kind: "success",
                caption: "",
                title: "Login Success",
                subtitle: "Redirecting to Home page...",
                timeout: 3000,
              });
              setShowNotification(true);

              setTimeout(() => {
                setShowNotification(false);
                router.push("/home");
              }, 3000);
              // router.push("/home");
            } else {
              setError(response.data.message || "Sign-in failed");
              setNotificationProps({
                kind: "error",
                caption: "",
                title: "Sign in Failed",
                subtitle: `Sign-in failed: ${response.data.message}`,
                timeout: 3000,
              });
              setShowNotification(true);

              // Redirect after notification
              setTimeout(() => {
                setShowNotification(false);
              }, 3000);
            }
          })
          .catch((error) => {
            Swal.close();
            setError("An error occurred during sign-in.");

            setNotificationProps({
              kind: "error",
              caption: "",
              title: "An error occured",
              subtitle: 'An error occurred during sign-in',
              timeout: 3000,
            });
            setShowNotification(true);

            // Redirect after notification
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          });
      },
    });
  };

  const handleGoogleSignInClick = async () => {
    setIsLoadingGoogleSignIn(true);
    try {
      await signIn();
    } catch (error) {
      console.error("Error signing in with Google:", error);

      setNotificationProps({
        kind: "error",
        caption: "",
        title: "sign in failed",
        subtitle: "Error signing in with Google",
        timeout: 3000,
      });
      setShowNotification(true);

      // Redirect after notification
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } finally {
      setIsLoadingGoogleSignIn(false);
    }
  };

  const MyForm = () => (
    <Form
      aria-label="login-form"
      className="login-form"
      onSubmit={handleSignIn}
    >
      <Heading
        style={{
          textAlign: "left",
          width: "100%",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Welcome Back, to Medlink
      </Heading>
      <TextInput
        id="email"
        name="email"
        type="email"
        className="inputs"
        labelText="Enter your Address"
        placeholder="Email Address"
        ref={emailRef}
      />
      <TextInput
        id="password"
        name="password"
        className="inputs"
        labelText="Enter your Password"
        type="password"
        placeholder="password"
        ref={passwordRef}
      />
      <Button size="sm" type="submit" className="btns">
        Sign In
      </Button>
      {error && <p className="error-message">{error}</p>}
      <Heading
        className="forgot-password"
        onClick={handleForgotPasswordClick}
        disabled={isLoadingForgotPassword}
      >
        <p> {isLoadingForgotPassword ? "Loading..." : "Forgot password?"}</p>{" "}
      </Heading>
      {/* <Heading className="or-container">
        <hr className="or-line" />
        <span className="or-text">OR</span>
        <hr className="or-line" />
      </Heading> */}
      {/* <Button
        kind="secondary"
        className="btns"
        size="sm"
        onClick={handleGoogleSignInClick}
        disabled={isLoadingGoogleSignIn}
      >
        {isLoadingGoogleSignIn ? "Loading..." : "Continue with Google"}
      </Button> */}
    </Form>
  );

  return (
    <div className="signin-form">
      {showNotification && (
        <Notifications
          kind={notificationProps.kind}
          caption={notificationProps.caption}
          title={notificationProps.title}
          subtitle={notificationProps.subtitle}
          timeout={notificationProps.timeout}
        />
      )}
      <MyForm />
    </div>
  );
}

export default SignInForm;
