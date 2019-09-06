import React from "react";
import css from './Header.module.css'
function Header(props) {
    let elems = [
        {name : 'Home'},
        {name : 'List'},
        {name : 'Categories'},
        {name : 'Help'}
        ];
    return(
        <header className={css.header}>
            Menu
            <ul>
            {
                elems.map((el=> <li><a href="#">{el.name}</a></li> ))
            }
            </ul>
        </header>
    )
}

export default Header