import React, { useState, useEffect } from "react";
import "./style.scss";
import {
  ChevronDown,
  ChevronUp,
  InformationSquare,
  Logout,
  Notification,
  Settings,
  UserAvatar,
} from "@carbon/icons-react";
import {
  Button,
  ContainedList,
  ContainedListItem,
  ExpandableSearch,
  Tooltip,
} from "@carbon/react";
import Messages from "../messages";
import App from "@/app/api/api";
import Notifications from "@/components/notification/index";

function Header() {
  const [expanded, setExpanded] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState(false);
  const expand = () => {
    setExpanded(!expanded);
  };
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    kind: "",
    caption: "",
    title: "",
    subtitle: "",
    timeout: "",
  });
  const [patientData, setPatientData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await App.get("/auth/user-data/", {
          withCredentials: true,
        });

        const data = response.data;
        setPatientData(data);
        console.log("Patient data auth", data);

        if (!data.authenticated) {
          setNotificationProps({
            kind: "error",
            caption: "",
            title: "An error occured",
            subtitle: "User is not authenticated",
            timeout: 3000,
          });
          setShowNotification(true);

          // Redirect after notification
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
        }
      } catch (error) {
        setNotificationProps({
          kind: "error",
          caption: "",
          title: "An error occured",
          subtitle: `Error fetching patient data: ${error.message}`,
          timeout: 3000,
        });
        setShowNotification(true);

        // Redirect after notification
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await App.post("/auth/logout/", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.data;

      if (data.success) {
        window.location.href = "/onboarding/welcome-to-medlink/auth/sign-in";
      } else {
        setNotificationProps({
          kind: "success",
          caption: "",
          title: "Logged out",
          subtitle: data.message || "Log out was successfull",
          timeout: 3000,
        });
        setShowNotification(true);

        // Redirect after notification
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    } catch (error) {
      setNotificationProps({
        kind: "error",
        caption: "",
        title: "Failed!",
        subtitle: data.message || "Log out Failed!",
        error,
        timeout: 3000,
      });
      setShowNotification(true);

      // Redirect after notification
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };
  return (
    <div className="header">
      {showNotification && (
        <Notifications
          kind={notificationProps.kind}
          caption={notificationProps.caption}
          title={notificationProps.title}
          subtitle={notificationProps.subtitle}
          timeout={notificationProps.timeout}
        />
      )}
      {messages ? <Messages messages={messages} /> : ""}
      <div className="notification icon">
        <Notification size={32} onClick={() => setMessages(!messages)} />
        <span className="notification-count">4</span>
      </div>

      <div className="profile">
        <section className="profile-pic icon">
          <UserAvatar
            size={32}
            className="user-icon"
            style={{ cursor: "pointer" }}
            onClick={expand}
          />
        </section>
        <section className="profile-information">
          <div className="info">
            <h3>{patientData.name || "none"}</h3>
            <small>{patientData.city || "none"}</small>
          </div>
          <div className="more-options">
            {expanded ? (
              <Tooltip label="More Info" enterDelayMs={0} leaveDelayMs={300}>
                <ChevronUp onClick={expand} className="more" />
              </Tooltip>
            ) : (
              <ChevronDown onClick={expand} className="more" />
            )}
          </div>
        </section>
      </div>

      <ContainedList
        className={`user_info ${expanded ? "expanded" : ""}`}
        label="My Information"
        style={{
          position: "absolute",
          zIndex: "19000",
          right: "0",
          height: "auto",
          width: "auto",
          top: "100px",
          background: "var(--primary-color-2)",
        }}
        size="lg"
      >
        <div className={`user_info ${expanded ? "expanded" : ""}`}>
          <section className="user-details icon">
            <UserAvatar
              size={32}
              className="user-image"
              style={{ cursor: "pointer" }}
            />
            <div className="details">
              <h2 className="user_name">{patientData.name || "none"}</h2>
              <p className="phone" style={{ color: "var(--text-color)" }}>
                {patientData.number || "none"}
              </p>
            </div>
          </section>
          <div className="information">
            <section className="options">
              <ul>
                <li onClick={handleLogout}>
                  <span>Log out</span>
                  <Logout size={32} />{" "}
                </li>
              </ul>
            </section>
            <section className="privacy">
              <p>privacy and terms of service</p>
            </section>
          </div>
        </div>
      </ContainedList>
    </div>
  );
}

export default Header;
