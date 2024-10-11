"use client";
import React, { useState } from "react";
import { Button, Form, Heading, TextInput, Loading } from "@carbon/react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import App from "@/app/api/api";
import Notifications from "@/components/notification/index";

function TwoFactorAuth() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    kind: "",
    caption: "",
    title: "",
    subtitle: "",
    timeout: "",
  });

  const verify2Fa = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Verifying 2FA",
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
        `/auth/verify_2fa/`,
        { email, code },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials:true
        }
      );

      Swal.close();

      if (response.data.success) {
        setSuccess(response.data.message);
        setError("");
        setNotificationProps({
          kind: "success",
          caption: "",
          title: "Success",
          subtitle: "2FA verified successfully.",
          timeout: 3000,
        });
        setShowNotification(true);

        setTimeout(() => {
          setShowNotification(false);
        }, 3000);

        Swal.fire({
          title: "Redirecting",
          text: "Please wait while we redirect you...",
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
          Swal.close();
          router.push("/onboarding/welcome-to-medlink/auth/2fa_security/verified");
        }, 2000);
      } else {
        setNotificationProps({
          kind: "error",
          caption: "",
          title: "Error",
          subtitle: `An error occurred: ${response.data.message}`,
          timeout: 3000,
        });
        setShowNotification(true);

        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    } catch (err) {
      Swal.close();
      setError(err.response?.data?.message || "An error occurred");
      setSuccess("");

      setNotificationProps({
        kind: "error",
        caption: "",
        title: "Error",
        subtitle: err.response?.data?.message || "An error occurred during 2FA verification",
        timeout: 3000,
      });
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const resendCode = async () => {
    setIsResending(true);
    try {
      const response = await App.post(
        `/auth/resend-2fa-code/`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setNotificationProps({
          kind: "success",
          caption: "",
          title: "Sent successfully!",
          subtitle: "2FA code resent. Please check your email.",
          timeout: 3000,
        });
        setShowNotification(true);

        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      } else {
        setNotificationProps({
          kind: "error",
          caption: "",
          title: "An error occurred!",
          subtitle: `Error: ${response.data.message}`,
          timeout: 3000,
        });
        setShowNotification(true);

        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    } catch (err) {
      setNotificationProps({
        kind: "error",
        caption: "",
        title: "An error occurred!",
        subtitle: "An error occurred while resending the 2FA code.",
        timeout: 3000,
      });
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } finally {
      setIsResending(false);
    }
  };

  return (
      <div className="form">
        {showNotification && (
          <Notifications
            kind={notificationProps.kind}
            caption={notificationProps.caption}
            title={notificationProps.title}
            subtitle={notificationProps.subtitle}
            timeout={notificationProps.timeout}
          />
        )}
        <div className="svg-part"></div>
        <div className="form-part">
          <Form
            aria-label="request-form"
            className="fa-form"
            onSubmit={verify2Fa}
          >
            <Heading
              style={{
                textAlign: "left",
                width: "100%",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Two Factor Authentication
            </Heading>
            <Heading>
              You are seeing this feature because you enabled two-factor
              authentication. You can disable this in your account settings.
            </Heading>
            <TextInput
              id="code"
              type="number"
              className="inputs"
              labelText="Enter the code"
              placeholder="Enter your 2FA code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <div className="flex-btnss">
              <Button size="sm" type="submit" className="btns">
                Proceed
              </Button>
              <Heading
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={resendCode}
              >
                {isResending ? (
                  <>
                    <Loading small withOverlay={false} />
                    <span style={{ marginLeft: "8px" }}>Resending...</span>
                  </>
                ) : (
                  "Resend 2FA code"
                )}
              </Heading>
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </Form>
        </div>
      </div>
  );
}

export default TwoFactorAuth;
