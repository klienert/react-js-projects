import React from "react";
import chef_icon from "../images/chef-icon.png";

const Header = () => {

    return (
        <header className="chef-claude-header">
            <img src={chef_icon} alt="chef icon" />
            <h2>Chef Claude</h2>
        </header>
    )
}

export default Header;