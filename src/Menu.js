import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './StyleSheet/Menu.css';
const Menu=({...props})=> {
    return(
      <div className={props.openStatus ? "open menu" : "menu" }>
        <ul className="list_menu">
          <li className="menu_item"><NavLink activeClassName="active" to='/table'>Contacts </NavLink></li>
          <li className="menu_item"><NavLink activeClassName="active" to='/addmailinglist'>Mailing List</NavLink></li>
          {/*<li className="menu_item"><NavLink activeClassName="active" to='/sendemails'> Send Email </NavLink></li>*/}
        </ul>
      </div>
      );
}
export default Menu;
