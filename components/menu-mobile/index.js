import {React, useEffect} from "react";
import './styles.scss'

function MenuMobile({ children }) {
  return (
    <div className="menu-mobile">
      <ul>
          <li>{children}</li>
      </ul>
    </div>
  );
}

function MenuItem({ item, icon }) {
  
  return (
    <div className="menu-item-mobile">
      <span className="menu-item-icon">{icon}</span>
      <span className="menu-item-text">{item}</span>
    </div>
  );
}

export { MenuMobile, MenuItem };
