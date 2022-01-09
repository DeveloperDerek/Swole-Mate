import React from "react";

const Navbar = () => {
    return(
        <nav className="navbar">
            {/* LOGO */}
                <a className="logo" href="/">SwoleMate</a>
            {/* NAVIGATION MENU */}
            <ul className="nav-links">
                {/* USING CHECKBOX HACK */}
                <input type="checkbox" id="checkbox_toggle" />
                <label for="checkbox_toggle" className="hamburger">&#9776;</label>
                {/* NAVIGATION MENUS */}
                <div className="menu">
                    <li className="services">
                        <a href="/">About</a>
                        {/* DROPDOWN MENU */}
                        <ul className="dropdown">
                            <li><a href="/about">About</a></li>
                            <li><a href="/faq">FAQ</a></li>
                        </ul>
                    </li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                </div>
            </ul>
        </nav>
    )
}

export default Navbar