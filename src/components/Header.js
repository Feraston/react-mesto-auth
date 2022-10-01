import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ headerMail, signOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Лого" className="logo" />
      <Route exact path="/">
        <div className="header__info">
          <p className="header__entry">{headerMail}</p>
          <Link to="/sign-in" className="header__out" onClick={signOut}>
            Выйти
          </Link>
        </div>
      </Route>
      <Route path="/sign-in">
          <Link to="/sign-up" className="header__sign">
            Регистрация
          </Link>
      </Route>
      <Route path="/sign-up">
          <Link to="/sign-in" className="header__sign">
            Войти
          </Link>
      </Route>
    </header>
  );
}

export default Header;
