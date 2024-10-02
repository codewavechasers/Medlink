import React, { useState } from "react";
import "@carbon/react";
import { Button, Form, Heading, TextInput, Loading } from "@carbon/react";
import Swal from "sweetalert2";
import App from "@/app/api/api";
import Notifications from "@/components/notification/index";

function PasswordRequest() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    kind: "",
    caption: "",
    title: "",
    subtitle: "",
    timeout: "",
  });
  const sendResetLink = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Requesting Reset Link",
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
    setIsLoading(true);
    try {
      const response = await App.post("/auth/password/reset/", { email });
      if (response.data.success) {
        Swal.close();

        setNotificationProps({
          kind: "success",
          caption: "",
          title: "Request successfull",
          subtitle: `${response.data.message}`,
          timeout: 3000, // Duration
        });
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      } else {
        setNotificationProps({
          kind: "error",
          caption: "",
          title: "An error occured!",
          subtitle: `${response.data.message}`,
          timeout: 3000, // Duration
        });
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);

        Swal.close();
      }
    } catch (err) {

      setNotificationProps({
        kind: "error",
        caption: "",
        title: "Unknown error occured!",
        subtitle: err.response?.data?.error || "An error occurred",
        timeout: 3000, // Duration
      });
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      Swal.close();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form">
      <div className="svg-part"></div>
      <div className="form-part">
        <Form
          aria-label="request-form"
          className="request-form"
          onSubmit={sendResetLink}
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
          <TextInput
            id="email"
            type="email"
            className="inputs"
            labelText="Enter your Address"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button size="sm" type="submit" className="btns" disabled={isLoading}>
            {isLoading ? (
              <>
                {/* <Loading inline /> */}

                <span style={{ marginLeft: "8px" }}>Sending...</span>
              </>
            ) : (
              "Get Reset Link"
            )}
          </Button>
          {showNotification && (
            <Notifications
              kind={notificationProps.kind}
              caption={notificationProps.caption}
              title={notificationProps.title}
              subtitle={notificationProps.subtitle}
              timeout={notificationProps.timeout}
            />
          )}{" "}
        </Form>
      </div>
    </div>
  );
}

export default PasswordRequest;
