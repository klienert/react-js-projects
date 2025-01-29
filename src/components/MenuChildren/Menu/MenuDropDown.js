

const MenuDropDown = ({ children, open, toggle }) => {
    return open ? (
        <div className="nav-bar-dropdown">
            {children}
        </div>
    ) : null
}

export default MenuDropDown;