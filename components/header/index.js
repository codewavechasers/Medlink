import React from "react";
import { useState } from "react";
import "./style.scss";
import {
  ChevronDown,
  ChevronUp,
  InformationSquare,
  Logout,
  Notification,
  Settings,
  UserAvatarFilled,
} from "@carbon/icons-react";
import {
  Button,
  ContainedList,
  ContainedListItem,
  Modal,
  Tooltip,
} from "@carbon/react";

function Header() {
  const [expanded, setExpanded] = useState(false);
  const expand = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="header">
      <div className="notification">
        <Notification size={32} /> <span className="notification-count">5</span>
      </div>

      <div className="profile">
        <section className="profile-pic">
          <UserAvatarFilled
            className="user-icon"
            style={{ cursor: "pointer" }}
            onClick={expand}
          />
        </section>
        <section className="profile-information">
          <div className="info">
            <h3>Anotida Expected</h3>
            <small>Zambia</small>
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
          <section className="user-details">
            <UserAvatarFilled
              className="user-image"
              style={{ cursor: "pointer" }}
            />
            <div className="details">
              <h2 className="user_name">Anotida Expected</h2>
              <p className="phone">075894394304</p>
            </div>
          </section>
          <div className="information">
            <section className="options">
              <ul>
                <li>
                  <span>About</span>
                  <InformationSquare size={32} />{" "}
                </li>
                <li>
                  <span>Settings</span>
                  <Settings size={32} />{" "}
                </li>
                <li>
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
