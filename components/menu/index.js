import {React, useEffect} from "react";
import './styles.scss'

function Menu({ children }) {
  return (
    <div className="menu">
      <ul>
          <li>{children}</li>
      </ul>
    </div>
  );
}

function MenuItem({ item, icon }) {
  
  return (
    <div className="menu-item">
      <span className="menu-item-icon">{icon}</span>
      <span className="menu-item-text">{item}</span>
    </div>
  );
}

export { Menu, MenuItem };
