import React from "react";
import { useState, useEffect } from "react";
import "./styles.scss";
import { ChevronLeft, ChevronRight } from "@carbon/icons-react";
import Footer from "../footer";
function MobileSideBar({  children}) {
    // const [isCollapsed, setIsCollapsed] = useState(initialIsCollapsed);

//   useEffect(() => {
//     setIsCollapsed(initialIsCollapsed);
//   }, [initialIsCollapsed]);

//   const collapse = () => {
//     const newCollapseState = !isCollapsed;
//     setIsCollapsed(newCollapseState);
//     localStorage.setItem("collapsed", JSON.stringify(newCollapseState));
//     window.dispatchEvent(new Event("localStorageChange"));
//   };
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 1260) {
//         setIsCollapsed(true);
//       } else {
//         setIsCollapsed(false);
//       }
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
  return (
    <div className={`mobilesidebar `}>
      {children}
      <Footer />

    </div>
  );
}

export default MobileSideBar;
