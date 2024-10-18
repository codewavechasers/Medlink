"use client";
import React, { useState, useEffect } from "react";
import { Loading } from "@carbon/react";
import "./layout.scss";
import SideBar from "../../components/sidebar";
import MobileSideBar from "../../components/mobile-sidebar";
import Header from "../../components/header";
import Content from "../../components/content";
import { Menu } from "../../components/menu";
import { MenuMobile } from "../../components/menu-mobile";
import { Button, ButtonSkeleton } from "@carbon/react";
import {
  Bee,
  Calendar,
  Chat,
  Workspace,
  Person,
  Video,
  SidePanelOpen,
  SidePanelClose,
} from "@carbon/icons-react";
import Chats from "./chats";
import Appointments from "./appointments";
import Help from "./help";
import Dashboard from "./dashboard";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import Conferencing from "./conferencing";
import { useRouter } from "next/navigation";
function Container() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(defaSelected);
  const [selectedItem, setSelectedItem] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 760) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
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
    console.log("Stored item:", storedItem);

    if (!storedItem) {
      setSelectedItem("Dashboard");
      // setSelectedItem(defaSelected);
      // localStorage.setItem("selectedItem", defaSelected);
      localStorage.setItem("selectedItem", selectedItem);
    } else {
      setSelectedItem(storedItem);
      // console.log("Setting stored item:", storedItem);
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
    // window.addEventListener("localStorageChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChange", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1260) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const speaktoDoctor = () => {
    localStorage.setItem("selectedItem", "conferencing");
    
    router.push("/home");  };
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
      icon: <Person size={32} />,
    },
    {
      name: "Media Consultation",
      path: "conferencing",
      icon: <Video size={32} />,
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
      case "conferencing":
        return <Conferencing />;
      default:
        return <Dashboard onMedicationClick={handleMedicationClick} />;
    }
  };
  const [mobile_bar, setMobilebiew] = useState(false);
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
      {isMobile ? (
        <div className="abs-navbar">
          {mobile_bar ? (
            <SidePanelClose
              onClick={() => setMobilebiew(!mobile_bar)}
              size={32}
            />
          ) : (
            <SidePanelOpen
              onClick={() => setMobilebiew(!mobile_bar)}
              size={32}
            />
          )}
        </div>
      ) : (
        ""
      )}
      {mobile_bar ? (
        <div className="mobile-navbar">
          <MobileSideBar className="desk_nav">
            <div className="logo-info">
              <div className="logo">
                <img src="../logov2.svg" alt="logo" />
              </div>
              <div className={`doctor ${isLoading ? "loading" : ""}`}>
                {isLoading ? (
                  <ButtonSkeleton
                    kind="secondary"
                    className="button-transition"
                    width="150px"
                  />
                ) : (
                  <Button
                    kind="secondary"
                    className="button-transition speak"
                    onClick={() => speaktoDoctor()}
                  >
                    Speak to a doctor
                  </Button>
                )}
              </div>
            </div>
            <div className="menu-mobile">
              <MenuMobile>
                {navLink.map(({ path, name, icon }) => (
                  <div
                    key={name}
                    onClick={() => handleMenuItemClick(path)}
                    className={`menu-item-mobile ${
                      selectedItem === path ? "selected" : ""
                    }`}
                  >
                    <>
                      {icon}
                      {name}
                    </>
                  </div>
                ))}
              </MenuMobile>
            </div>
          </MobileSideBar>
        </div>
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
                    onClick={() => speaktoDoctor()}
                  />
                ) : isLoading ? (
                  <ButtonSkeleton
                    kind="secondary"
                    className="button-transition"
                    width="150px"
                  />
                ) : (
                  <Button
                    kind="secondary"
                    className="button-transition speak"
                    onClick={() => speaktoDoctor()}
                  >
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
