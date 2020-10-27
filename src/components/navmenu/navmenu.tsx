import React from 'react';
import './navmenu.css';
import {Button} from "react-bootstrap";
import {render} from "react-dom";

const NavMenu: React.FC = () => (
  <div className="navmenu" data-testid="navmenu">
      <button className="btn-dark btn nav-gap">About</button>
      <button className="btn-dark btn nav-gap">Login</button>
  </div>
);


export default NavMenu;
