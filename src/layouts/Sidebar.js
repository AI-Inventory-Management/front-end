import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import { SidebarData } from "./SidebarData";
import logo from "../images/logo/RIICO logo.png";

function Sidebar() {
  return (
    <div className="sb-sidebar">
      <ul className="sb-ul">
        <div className="sb-img-container">
          <Link to="/">
            <img className="sb-user-img" alt="imagen de perfil" src={logo} />
          </Link>
        </div>
        <Link className="sd-user" to="/usuario">
          <li className="sd-user-li">
            <div className="sd-user-li-letter">P</div>
            <p>Post Malone</p>
          </li>
        </Link>
        {SidebarData.map((val, key) => {
          return (
            <Link key={key} className="sb-option" to={val.link}>
              <li className="sb-option-li">
                {val.icon}
                <p className="sb-option-title">{val.title}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
