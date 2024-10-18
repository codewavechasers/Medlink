import React, { useState, useEffect } from "react";
import "./style.scss";
import { Calendar, PillsSubtract } from "@carbon/icons-react";
import {
  Loading,
  ExpandableTile,
  ProgressBar,
  Tile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
  Heading,
  Button,
} from "@carbon/react";
import { Bee } from "@carbon/icons-react";
import Table from "../../../components/Table";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import HealthStatus from "./Healthstatus";
import NextAppointments from "./next-appointment";
import MedicationHub from "./MedicationHub";
import WithAuthRedirect from "@/app/api/withAuthRedirect.js";
import App from "@/app/api/api";
import Notifications from "@/components/notification/index";
function Dashboard() {
  const [showHealthStatus, setshowHealthStatus] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const [showMedicationHub, setshowMedicationHub] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [nextAppointmentDate, setNextAppointmentDate] = useState(null);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [noticeboardUpdates, setNoticeboardUpdates] = useState([]);
  const [patientName, setPatientName] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProps, setNotificationProps] = useState({
    kind: "",
    caption: "",
    title: "",
    subtitle: "",
    timeout: "",
  });
  const [OverallHealthScore, setOverallHealthScore] = useState(null);

  useEffect(() => {
    fetchNextAppointmentDate();
    fetchSubscriptionCount();
    fetchNoticeboardUpdates();
  }, []);
  useEffect(() => {
    const getOveralHealthScore = async () => {
      const response = await App.get("/api/get-overall-healthscore/", {
        withCredentials: true,
      });
      const overallHealth = response.data.overall_health_score;
      setOverallHealthScore(overallHealth);
    };
    getOveralHealthScore();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await App.get("/auth/user-data/", {
          withCredentials: true,
        });

        const data = response.data;
        setPatientName(data);
        console.log("Patient data auth", data);

        if (!data.authenticated) {
          setNotificationProps({
            kind: "error",
            caption: "",
            title: "Authentication in failed",
            subtitle: "User is not authenticated",
            timeout: 3000,
          });
          setShowNotification(true);

          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
        }
      } catch (error) {
        setNotificationProps({
          kind: "error",
          caption: "",
          title: "Authentication in failed",
          subtitle: `Error fetching patient data`,
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
  const fetchNoticeboardUpdates = async () => {
    try {
      const response = await App.get("/api/notice-board-updates/", {
        withCredentials: true,
      });
      setNoticeboardUpdates(response.data.updates);
    } catch (error) {
      console.error("Error fetching noticeboard updates:");
    }
  };

  const fetchNextAppointmentDate = async () => {
    try {
      const response = await App.get(`/bookings/api/next-appointment/`, {
        withCredentials: true,
      });
      setNextAppointmentDate(response.data.next_appointment_date);
    } catch (error) {
      console.error("Error fetching next appointment date:");
    }
  };

  const fetchSubscriptionCount = async () => {
    try {
      const response = await App.get(`/api/subscription-count/`, {
        withCredentials: true,
      });
      setSubscriptionCount(response.data.subscription_count);
    } catch (error) {
      console.error("Error fetching subscription count:");
    }
  };
  const formatNoticeDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "long" });
    return { day, month };
  };

  useEffect(() => {
    const hasRefreshed = localStorage.getItem("hasRefreshed");

    if (!hasRefreshed) {
      localStorage.setItem("hasRefreshed", "true");
      localStorage.setItem("selectedItem", "dashboard");
      window.location.reload();
    } else {
      localStorage.setItem("hasRefreshed", "true");
    }
  }, []);
  useEffect(() => {
    if (contentLoading) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }, [contentLoading]);

  const handleHealthStatusClick = () => {
    setContentLoading(true);
    setTimeout(() => {
      setshowHealthStatus(true);
      setContentLoading(false);
    }, 1000);
  };

  const handleAppointmentClick = () => {
    setContentLoading(true);
    setTimeout(() => {
      setShowAppointment(true);
      setContentLoading(false);
    }, 1000);
  };
  const handleMedicationhubClick = () => {
    setContentLoading(true);
    setTimeout(() => {
      setshowMedicationHub(true);
      setContentLoading(false);
    }, 1000);
  };

  const handleBackToDashboard = () => {
    setContentLoading(true);
    setTimeout(() => {
      setshowHealthStatus(false);
      setshowMedicationHub(false);
      setShowAppointment(false);
      setContentLoading(false);
    }, 1000);
  };

  if (contentLoading) {
    return <Loading description="Loading content" withOverlay={true} />;
  }

  if (showHealthStatus) {
    return <HealthStatus handleBackToDashboard={handleBackToDashboard} />;
  }

  if (showAppointment) {
    return <NextAppointments handleBackToDashboard={handleBackToDashboard} />;
  }
  if (showMedicationHub) {
    return <MedicationHub handleBackToDashboard={handleBackToDashboard} />;
  }

  const speaktoDoctor = () => {
    localStorage.setItem("selectedItem", "conferencing");
    window.location.href = "/home";
  };

  return (
    <WithAuthRedirect>
      {showNotification && (
        <Notifications
          kind={notificationProps.kind}
          caption={notificationProps.caption}
          title={notificationProps.title}
          subtitle={notificationProps.subtitle}
          timeout={notificationProps.timeout}
        />
      )}
      <div className="medlink-dashboard">
        <div className="floating-doctor">
          <Button
            hasIconOnly
            renderIcon={Bee}
            onClick={speaktoDoctor}
            iconDescription="WhatsonX AI"
          />
        </div>
        <Heading className="dash-title">
          Welcome Back, {patientName.name || "none"}
        </Heading>
        <div className="dashboard-body">
          <div className="top-dash">
            <div className="med_cards">
              <Tile
                onClick={handleHealthStatusClick}
                id="tile-1"
                className="med-card"
                style={{ cursor: "pointer", width: "100%" }}
              >
                <Heading className="card-header">Your Overall Health</Heading>
                <br />
                <br />
                <ProgressBar
                  helperText={`Health status: ${OverallHealthScore} %`}
                  value={OverallHealthScore || 50}
                  style={{ height: "100%" }}
                />
              </Tile>
              <Tile id="tile-2" style={{ width: "100%" }} className="med-card">
                <Heading className="card-header">Notice Board</Heading>
                <br />
                {noticeboardUpdates.length > 0 ? (
                  noticeboardUpdates.map((update, index) => (
                    <div
                      key={index}
                      style={{
                        background: "var(--secondary-color)",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "4px",
                      }}
                    >
                      <h4 style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>
                        {update.title}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.8em",
                          color: "#666",
                          margin: "0 0 5px 0",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        {formatNoticeDate(update.created_at)}
                      </p>
                      <p style={{ margin: "0", fontSize: "1em" }}>
                        {update.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No updates available</p>
                )}
              </Tile>
            </div>
          </div>
          <main className="main_dash">
            <div className="appoint-medic">
              <ExpandableTile
                id="expandable-tile-1"
                tileCollapsedIconText="Check your next Appointment"
                tileExpandedIconText="Check your next Appointment"
                expanded={true}
                onClick={handleAppointmentClick}
                className="app-card"
                style={{ height: "100%" }}
              >
                <TileAboveTheFoldContent>
                  <Heading className="card-header">Next Appointment</Heading>
                </TileAboveTheFoldContent>
                <TileBelowTheFoldContent>
                  <div>
                    <div className="dates">
                      {nextAppointmentDate ? (
                        <>
                          <h3
                            style={{ fontSize: "5rem", fontWeight: "bolder" }}
                          >
                            {formatDate(nextAppointmentDate).day}
                          </h3>
                          <small style={{ fontSize: "20px" }}>
                            {new Date(nextAppointmentDate).toLocaleString(
                              "default",
                              { month: "long" }
                            )}
                          </small>
                        </>
                      ) : (
                        <div style={{ height: "auto" }}>
                    <div className="med-below">
                      <div>
                        <Calendar fill="#A4BCD2" size={64} />
                      </div>
                      <small
                        style={{
                          position: "relative",
                          padding: "5px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "auto",
                          borderRadius: "5px",
                          cursor: "pointer",
                          zIndex: "20",
                          maxWidth: "300px",
                          width: "100%",
                          fontWeight: "bold",
                        }}
                      >
                        No Appointments to show. Book one.
                        
                      </small>
                    </div>
                  </div>
                      )}
                    </div>
                  </div>
                </TileBelowTheFoldContent>
              </ExpandableTile>
              <ExpandableTile
                className="app-card"
                id="expandable-tile-2"
                tileCollapsedIconText="Check all about your medication"
                tileExpandedIconText="Check all about your medication"
                expanded={true}
                onClick={handleMedicationhubClick}
              >
                <TileAboveTheFoldContent>
                  <div
                    style={{
                      height: "100%",
                      textAlign: "left",
                    }}
                  >
                    <Heading className="card-header"> Your Medication</Heading>
                  </div>
                </TileAboveTheFoldContent>
                <TileBelowTheFoldContent>
                  <div style={{ height: "auto" }}>
                    <div className="med-below">
                      <div>
                        <PillsSubtract fill="#A4BCD2" size={64} />
                      </div>
                      <small
                        style={{
                          position: "relative",
                          padding: "5px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "auto",
                          borderRadius: "5px",
                          cursor: "pointer",
                          background: "var(--secondary-color)",
                          zIndex: "20",
                          maxWidth: "300px",
                          width: "100%",
                          fontWeight: "bold",
                        }}
                      >
                        Prescriptions
                        <span
                          style={{
                            background: "var(--primary-color)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            cursor: "pointer",
                            position: "absolute",
                            right: "5px",
                            padding: "0 2px",
                          }}
                        >
                          {subscriptionCount}
                        </span>
                      </small>
                    </div>
                  </div>
                </TileBelowTheFoldContent>
              </ExpandableTile>
            </div>
            <div className="doctor-notes">
              <Heading className="table-heading">Doctors notes</Heading>
              <Table />
            </div>
          </main>
        </div>
      </div>
    </WithAuthRedirect>
  );
}

export default Dashboard;
