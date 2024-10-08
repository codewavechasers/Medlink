import React, { useState, useEffect } from "react";
import "./style.scss";
import { Bee } from "@carbon/icons-react";

function Footer({ isCollapsed }) {
  return (
    <div className="footer">
      
      {isCollapsed ? <Bee size={32} /> :<span>
        Powered By: <br />
        {isCollapsed ? (
          <span style={{ marginLeft: "20px" }}>
            <Bee size={16} />
          </span>
        ) : (
          <span style={{ display: "inline-block", marginLeft: "20px" }}>
            IBM Whatson
          </span>
        )}
      </span>}
    </div>
  );
}

export default Footer;
