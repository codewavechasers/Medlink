"use client";
import React, { useState, useEffect } from "react";
import "./layout.scss";
import SideBar from "../../components/sidebar";
import Header from "../../components/header";
import Content from "../../components/content";
import { Menu, MenuItem } from "../../components/menu";
import { Button, ButtonSkeleton } from "@carbon/react";
import { Bee, Calendar, Chat, Workspace } from "@carbon/icons-react";
import Chats from "../../components/chats";
import Appointments from "../../components/appointments";
import Help from "../../components/help";
import Dashboard from "../../components/Dashboard";

function Container() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Dashboard");

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
    setSelectedItem(item);
    localStorage.setItem("selectedItem", item);
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
    switch (selectedItem) {
      case "Dashboard":
        return <Dashboard />;
      case "Chats":
        return <Chats />;
      case "Appointments":
        return <Appointments />;
      case "Help":
        return <Help />;
      case "More":
        return <div>More Content</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="layout">
      <SideBar isCollapsed={isCollapsed}>
        <div className="logo-info">
          <div className="logo">
            <img src="../logov2.svg" alt="logo" />
          </div>
          <div className={`doctor ${isLoading ? "loading" : ""}`}>
            {isCollapsed ? (
              <Button hasIconOnly renderIcon={Bee} iconDescription="Add" />
            ) : isLoading ? (
              <ButtonSkeleton className="button-transition" width="150px" />
            ) : (
              <Button className="button-transition">Speak to a doctor</Button>
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
    </div>
  );
}

export default Container;
