import React from "react";
import Menu from "./Menu/Menu";
import MenuButton from "./Menu/MenuButton";
import MenuDropDown from "./Menu/MenuDropDown";
import MenuItem from "./Menu/MenuItem";



const MenuNav = ({ menuDetails }) => {
    
    const sports= ["Tennis", "Pickleball", "Racquetball", "Squash"]

    return (
        <Menu>
            <MenuButton>Menu</MenuButton>
            <MenuDropDown>
                {menuDetails.map(x => {
                    return (
                        <MenuItem 
                            linkTo={x.to}
                            linkName={x.name}
                            key={x.to}
                        />
                    )
                })}                
            </MenuDropDown>            
        </Menu>
    )
}

export default MenuNav;