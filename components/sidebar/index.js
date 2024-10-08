import React from "react";
import { useState, useEffect } from "react";
import "./style.scss";
import { ChevronLeft, ChevronRight } from "@carbon/icons-react";
import Footer from "../footer";

function SideBar({ children, isCollapsed: initialIsCollapsed }) {
  const [isCollapsed, setIsCollapsed] = useState(initialIsCollapsed);

  useEffect(() => {
    setIsCollapsed(initialIsCollapsed);
  }, [initialIsCollapsed]);

  const collapse = () => {
    const newCollapseState = !isCollapsed;
    setIsCollapsed(newCollapseState);
    localStorage.setItem("collapsed", JSON.stringify(newCollapseState));
    window.dispatchEvent(new Event("localStorageChange"));
  };
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
  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="collapse-btn">
        {isCollapsed ? (
          <ChevronRight style={{color:"var(--text-color)"}} size={32} onClick={collapse} />
        ) : (
          <ChevronLeft style={{color:"var(--text-color)"}} size={32} onClick={collapse} />
        )}
      </div>
      {children}
      <Footer isCollapsed={isCollapsed} />

    </div>
  );
}

export default SideBar;
