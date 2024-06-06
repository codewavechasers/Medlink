import React from "react";
import "./style.scss";
import { ChevronDown, PillsSubtract } from "@carbon/icons-react";
import {
  ExpandableTile,
  ProgressBar,
  Tile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "@carbon/react";
import Table from "../../components/Table";

function Dashboard() {
  return (
    <div className="dashboard">
      <div style={{height: "35%" }}>
        <section className="page-title">Welcome Back, Ano </section>
        <section style={{ width: "100%", height: "80%" }}>
          <div
            className="med_cards"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "50px",
              justifyContent: "flex-start",
              position: "relative",
              backgroundColor: "transparent",
              height: "100%",
            }}
          >
            <Tile id="tile-1" style={{ width: "100%", height: "100%" }}>
              Your Overall Health
              <br />
              <br />
              <ProgressBar helperText="Health status" value={75} />{" "}
            </Tile>
            <Tile id="tile-1" style={{ width: "100%", height: "100%" }}>
              Notice Board
              <br />
              <br />
              <p
                style={{
                  padding: "5px",
                  width: "100%",
                  background: "var(--secondary-color)",
                }}
              >
                The new flue medication will roll out early next week
              </p>
            </Tile>
          </div>
        </section>
      </div>
      <main className="main_dash">
        <div className="appoint-medic">
          <div
            style={{
              width: "100%",
              height: "50%",
              // minWidth:"200px",
            }}
          >
            <ExpandableTile
              id="expandable-tile-1"
              tileCollapsedIconText="Interact to Expand tile"
              tileExpandedIconText="Interact to Collapse tile"
              style={{ height: "100%" }}
              expanded={true}
            >
              <TileAboveTheFoldContent>
                <div
                  style={{
                    height: "100%",
                    textAlign: "left",
                  }}
                >
                  Next Appointment
                </div>
              </TileAboveTheFoldContent>
              <TileBelowTheFoldContent>
                <div
                  style={{
                    height: "400px",
                  }}
                >
                  <div className="date">
                    <h3 style={{ fontSize: "5rem", fontWeight: "bolder" }}>
                      28
                    </h3>
                    <small style={{ fontSize: "2rem" }}>March</small>
                  </div>
                </div>
              </TileBelowTheFoldContent>
            </ExpandableTile>
          </div>
          <div
            style={{
              width: "100%",
              // minWidth:"200px",
              height: "50%",
            }}
          >
            <ExpandableTile
              id="expandable-tile-1"
              tileCollapsedIconText="Interact to Expand tile"
              tileExpandedIconText="Interact to Collapse tile"
              style={{ height: "100%" }}
              expanded={true}
            >
              <TileAboveTheFoldContent>
                <div
                  style={{
                    height: "100%",
                    textAlign: "left",
                  }}
                >
                  Your Medication
                </div>
              </TileAboveTheFoldContent>
              <TileBelowTheFoldContent>
                <div
                  style={{
                    height: "400px",
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
                        width: "50%",
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
                      </span>{" "}
                    </small>
                  </div>{" "}
                </div>
              </TileBelowTheFoldContent>
            </ExpandableTile>
          </div>
        </div>
        <div className="doctor-notes">
          <h4>Doctors notes</h4>
          <Table />        </div>
      </main>
    </div>
  );
}

export default Dashboard;
