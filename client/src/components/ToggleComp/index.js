import React from 'react';
import './style.css';
import Menu from "./components/Menu/index";
import Star from './components/Star';
import Toggle from './components/Toggle/index'


const ToggleComp = () => {

    return (
        <div className="toggle-comp">
            {/* <Star onChange={() => { }}/>
            <Menu onOpen={() => {console.log('menu test')}}>
                <Menu.Button>Menu</Menu.Button>                
                <Menu.Dropdown>
                    <Menu.Item>Home</Menu.Item>
                    <Menu.Item>About</Menu.Item>
                    <Menu.Item>Contact</Menu.Item>
                    <Menu.Item>Blog</Menu.Item>
                </Menu.Dropdown>
            </Menu> */}
            <Toggle>
                <Toggle.Button>
                    <Toggle.Display>
                        {((on) => {
                            return <div className={`toggle-box ${on ? "toggle-box-filled" : "" }`}></div>
                        })}
                    </Toggle.Display>

                    {/* <Toggle.On>
                        <div className="toggle-box toggle-box-filled"></div>
                    </Toggle.On>
                    <Toggle.Off>
                    <div className="toggle-box"></div>
                    </Toggle.Off> */}
                </Toggle.Button>
            </Toggle>
        </div>
    )
}
export default ToggleComp;