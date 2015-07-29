import React from "react";
import {Link} from "react-router";

if ("undefined" !== typeof window) {
  require("../../styles/common/Header.styl");
}

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <Link className="header__btn" to="/">
          Home
        </Link>
        <Link className="header__btn" to="/forums">
          Forums
        </Link>
        <Link className="header__btn" to="/search">
          Search
        </Link>
      </header>
    );
  }
}

export default Header;
