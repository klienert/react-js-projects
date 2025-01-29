import Button from "../Button/Button";

const MenuButton = ( {children, toggle } ) => {
        
    return (
        <Button onClick={toggle}>{children}</Button>
    )
}

export default MenuButton;