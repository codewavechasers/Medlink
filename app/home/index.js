"use client";
import React, { useState, useEffect } from "react";
import { Loading } from "@carbon/react";
import "./layout.scss";
import SideBar from "../../components/sidebar";
import Header from "../../components/header";
import Content from "../../components/content";
import { Menu, MenuItem } from "../../components/menu";
import { Button, ButtonSkeleton } from "@carbon/react";
import {
  Bee,
  Calendar,
  Chat,
  Workspace,
  Medication,
} from "@carbon/icons-react";
import Chats from "../chats";
import Appointments from "../appointments";
import Help from "../help";
import Dashboard from "../Dashboard";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

function Container() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [isMobile, setisMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 760) {
        setisMobile(true);
      } else {
        setisMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateCollapsedState = () => {
    const collapsedState = localStorage.getItem("collapsed");
    if (collapsedState !== null) {
      setIsCollapsed(JSON.parse(collapsedState));
    }
  };

  const updateSelectedItem = () => {
    const storedItem = localStorage.getItem("selectedItem");
    if (storedItem !== null) {
      setSelectedItem(storedItem);
    }
  };

  useEffect(() => {
    updateCollapsedState();
    updateSelectedItem();

    const handleStorageChange = () => {
      updateCollapsedState();
      updateSelectedItem();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChange", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleMenuItemClick = (item) => {
    nprogress.start();
    setContentLoading(true);
    setSelectedItem(item);
    localStorage.setItem("selectedItem", item);

    setTimeout(() => {
      nprogress.done();
      setContentLoading(false);
    }, 1000);
  };

  const handleMedicationClick = () => {
    handleMenuItemClick("Medication");
  };

  const navLink = [
    {
      name: "Dashboard",
      path: "Dashboard",
      icon: <Workspace size={32} />,
    },
    {
      name: "Chats",
      path: "Chats",
      icon: <Chat size={32} />,
    },
    {
      name: "Appointments",
      path: "Appointments",
      icon: <Calendar size={32} />,
    },
    {
      name: "Help Desk",
      path: "Help",
      icon: <Chat size={32} />,
    },

    {
      name: "More",
      path: "More",
      icon: <Chat size={32} />,
    },
  ];

  const renderContent = () => {
    if (contentLoading) {
      return <Loading description="Loading content" withOverlay={true} />;
    }

    switch (selectedItem) {
      case "Dashboard":
        return <Dashboard onMedicationClick={handleMedicationClick} />;
      case "Chats":
        return <Chats />;
      case "Appointments":
        return <Appointments />;
      case "Help":
        return <Help />;
      case "More":
        return <div>More Content</div>;
      default:
        return <Dashboard onMedicationClick={handleMedicationClick} />;
    }
  };

  return (
    <div className="layout">
      {isMobile ? (
        <Menu>
          {navLink.map(({ path, name, icon }) => (
            <div
              key={name}
              onClick={() => handleMenuItemClick(path)}
              className={`menu-item ${selectedItem === path ? "selected" : ""}`}
            >
              {isCollapsed ? <>{icon}</> : <>{icon}</>}
            </div>
          ))}
        </Menu>
      ) : (
        ""
      )}

      {isLoading && <Loading description="Please wait" withOverlay={true} />}
      {!isLoading && (
        <>
          <SideBar className="desk_nav" isCollapsed={isCollapsed}>
            <div className="logo-info">
              <div className="logo">
                <img src="../logov2.svg" alt="logo" />
              </div>
              <div className={`doctor ${isLoading ? "loading" : ""}`}>
                {isCollapsed ? (
                  <Button
                    hasIconOnly
                    renderIcon={Bee}
                    iconDescription="WhatsonX AI"
                  />
                ) : isLoading ? (
                  <ButtonSkeleton
                    kind="secondary"
                    className="button-transition"
                    width="150px"
                  />
                ) : (
                  <Button kind="secondary" className="button-transition">
                    Speak to a doctor
                  </Button>
                )}
              </div>
            </div>
            <div className="menus">
              <Menu>
                {navLink.map(({ path, name, icon }) => (
                  <div
                    key={name}
                    onClick={() => handleMenuItemClick(path)}
                    className={`menu-item ${
                      selectedItem === path ? "selected" : ""
                    }`}
                  >
                    {isCollapsed ? (
                      <>{icon}</>
                    ) : (
                      <>
                        {icon}
                        {name}
                      </>
                    )}
                  </div>
                ))}
              </Menu>
            </div>
          </SideBar>
          <div className="container_comp">
            <section className="header-section">
              <Header />
            </section>
            <section className="content-section">
            <Content>{renderContent()}</Content>
            </section>
          </div>
        </>
      )}
    </div>
  );
}

export default Container;
