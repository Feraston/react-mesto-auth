import React from "react";
import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Лого" className="logo" />
    </header>
  );
}

export default Header;
