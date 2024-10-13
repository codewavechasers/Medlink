"use client"
import React, { useState, Suspense } from "react";
import "@carbon/react";
import { Button, Form, Heading, PasswordInput, Loading } from "@carbon/react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Notifications from "@/components/notification/index";

import App from "@/app/api/api";

function PasswordReset() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    kind: "",
    caption: "",
    title: "",
    subtitle: "",
    timeout: "",
  });
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setNotificationProps({
        kind: "error",
        caption: "",
        title: "Invalid credentials",
        subtitle: "Your passwords are not matching.",
        timeout: 3000,
      });
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return;
    }

    setIsLoading(true);
    Swal.fire({
      title: "Changing Password",
      text: "Please wait...",
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

    try {
      const response = await App.post(
        `/auth/password/reset/confirm/${uid}/${token}/`,
        { password, confirm_password: confirmPassword },
        { headers: { "Content-Type": "application/json" } }
      );
      Swal.close();
      if(response.status == 400){
        setNotificationProps({
          kind: "error",
          caption: "",
          title: "Error.",
          subtitle: `${response.data.error}`,
          timeout: 3000,
        });
        setShowNotification(true);
  
      
      }
      setNotificationProps({
        kind: "success",
        caption: "",
        title: "Password Changed.",
        subtitle: `${response.data.message}`,
        timeout: 3000,
      });
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        router.push("/onboarding/welcome-to-medlink/auth/password/complete");
      }, 3000);
    } catch (error) {
      Swal.close();
      console.log("error:")
      setNotificationProps({
        kind: "error",
        caption: "",
        title: "Unknown error occured",
        subtitle: "An error occurred",
        timeout: 3000,
      });
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      setIsLoading(false);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <PasswordResetForm
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        isLoading={isLoading}
        handlePasswordReset={handlePasswordReset}
        showNotification={showNotification}
        notificationProps={notificationProps}
      />
    </Suspense>
  );
}

function PasswordResetForm({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isLoading,
  handlePasswordReset,
  showNotification,
  notificationProps,
}) {


  return (
    <Suspense fallback={<Loading />}>

    <div className="form-reset">
      <div className="form-part-reset">
        <Form
          aria-label="reset-form"
          className="reset-form"
          onSubmit={handlePasswordReset}
        >
          <Heading
            style={{
              textAlign: "left",
              width: "100%",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Reset your Password
          </Heading>
          <div className="password-inputs">
            <PasswordInput
              id="password"
              labelText="New Password"
              helperText="Your password must meet the following criteria: at least 8 characters long, include both uppercase and lowercase letters, and contain at least one number and one special character."
              autoComplete="off"
              className="input-fields"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInput
              id="cpassword"
              labelText="Confirm Password"
              helperText="The passwords provided must match in order to proceed."
              autoComplete="off"
              className="input-fields"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button size="sm" type="submit" className="btns" disabled={isLoading}>
            {isLoading ? (
              <>
                <span style={{ marginLeft: "8px" }}>Changing Password...</span>
              </>
            ) : (
              "Change My Password"
            )}
          </Button>
        </Form>
      </div>
      <div className="svg-part-reset"></div>
      {showNotification && (
        <Notifications
          kind={notificationProps.kind}
          caption={notificationProps.caption}
          title={notificationProps.title}
          subtitle={notificationProps.subtitle}
          timeout={notificationProps.timeout}
        />
      )}
    </div>
    </Suspense>
  );
}

export default PasswordReset;
