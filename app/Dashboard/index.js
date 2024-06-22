import React, { useState, useEffect } from "react";
import "./style.scss";
import { PillsSubtract } from "@carbon/icons-react";
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
import Table from "../../components/Table";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import HealthStatus from "./Healthstatus";
import NextAppointments from "./next-appointment";
import MedicationHub from "./MedicationHub";

function Dashboard() {
  const [showHealthStatus, setshowHealthStatus] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const [showMedicationHub, setshowMedicationHub] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);

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
    }, 1000); // Simulate loading time
  };

  const handleAppointmentClick = () => {
    setContentLoading(true);
    setTimeout(() => {
      setShowAppointment(true);
      setContentLoading(false);
    }, 1000); // Simulate loading time
  };
  const handleMedicationhubClick = () => {
    setContentLoading(true);
    setTimeout(() => {
      setshowMedicationHub(true);
      setContentLoading(false);
    }, 1000); // Simulate loading time
  };

  const handleBackToDashboard = () => {
    setContentLoading(true);
    setTimeout(() => {
      setshowHealthStatus(false);
      setshowMedicationHub(false);
      setShowAppointment(false);
      setContentLoading(false);
    }, 1000); // Simulate loading time
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

  return (
    <div className="medlink-dashboard">
      <div className="floating-doctor">                  <Button hasIconOnly renderIcon={Bee} iconDescription="WhatsonX AI" />
      </div>
      <Heading className="dash-title">Welcome Back, Ano</Heading>
      <div className="dashboard-body">
        <div className="top-dash">
          <div className="med_cards">
            <Tile
              onClick={handleHealthStatusClick} // Add onClick handler here
              id="tile-1"
              className="med-card"
              style={{ cursor: "pointer", width: "100%" }}
            >
              <Heading className="card-header">Your Overall Health</Heading>
              <br />
              <br />
              <ProgressBar helperText="Health status" value={75} />{" "}
            </Tile>
            <Tile id="tile-2" style={{ width: "100%" }} className="med-card">
              <Heading className="card-header">Notice Board</Heading>
              <br />
              <br />
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "var(--secondary-color)",
                  paddingLeft: "10px",
                }}
              >
                The new flu medication will roll out early next week
              </p>
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
            >
              <TileAboveTheFoldContent>
                <Heading className="card-header">Next Appointment</Heading>
              </TileAboveTheFoldContent>
              <TileBelowTheFoldContent>
                <div>
                  <div className="dates">
                    <h3 style={{ fontSize: "5rem", fontWeight: "bolder" }}>
                      28
                    </h3>
                    <small style={{ fontSize: "20px" }}>March</small>
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
              onClick={handleMedicationhubClick} // Add onClick handler here
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
                <div
                  style={{
                    height: "auto",
                  }}
                >
                  <div className="med-below">
                    <div>
                      <PillsSubtract size={64} />
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
                        maxWidth:"300px",
                        width: "100%",
                        fontWeight: "bold",
                      }}
                    >
                      Subscription
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
                        3
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
  );
}

export default Dashboard;
