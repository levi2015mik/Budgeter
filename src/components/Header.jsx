import React from "react";
import css from './Header.module.css'
import { NavLink} from "react-router-dom";
function Header(props) {
    return(
        <header className={css.header}>

            <img src={"/icons8-doodle-64.png"} className={css.logo} alt={""}/>
            <h1>Personal accounting application</h1>
            <ul>
                <li><NavLink to="/" >Home</NavLink></li>
                <li><NavLink to="/categories" >Categories</NavLink></li>
                <li><NavLink to="/info" >Info</NavLink></li>
                <li><NavLink to="/help" >Help</NavLink></li>
                <li><NavLink to="/data" >Data*</NavLink></li>
            </ul>
        </header>
    )
}

export default Header