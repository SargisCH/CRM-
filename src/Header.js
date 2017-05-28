import './StyleSheet/Header.css';
import React, { Component } from 'react';
//import { NavLink } from 'react-router-dom';
import Menu from './Menu.js';
class Header extends Component{
    constructor(){
        super();
        this.state={
            menuStatus:false
        };
        this.changeMenuStatus = this.changeMenuStatus.bind(this);
    }
    changeMenuStatus() {
       this.setState({menuStatus:!this.state.menuStatus});
    }
    render(){
        return(
            <div className="header_container flex">
                <div className="row flex">
                    <div className="menu_icon" id="menu_icon" onClick={this.changeMenuStatus}>
                        <div className="icon_item"></div>
                        <div className="icon_item"></div>
                        <div className="icon_item"></div>
                    </div>
                    <div className="header flex">
                        <div className="logo">
                            <h1>BetBoard</h1>
                        </div>
                        {/*<div className="user flex">
                            <ul className="list flex">
                                <li className="list_item">Username</li>
                                <li className="list_item"><NavLink activeStyle={{ backgroundColor: '#907a94' }} to='/login'>Log out</NavLink></li>
                            </ul>
                        </div>*/}
                    </div>
                </div>
                <Menu openStatus={this.state.menuStatus} />
            </div>
        );
    }
}
export default Header;
        
