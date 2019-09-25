import React from "react";
import css from './Header.module.css'
import { NavLink} from "react-router-dom";
function Header(props) {
    return(
        <header className={css.header}>
            Personal accounting application
            <ul>
                <li><NavLink to="/" >Home</NavLink></li>
                <li><NavLink to="/categories" >Categories</NavLink></li>
                <li><NavLink to="/info" >Info</NavLink></li>
                <li><NavLink to="/help" >Help</NavLink></li>
            </ul>
        </header>
    )
}

export default Header