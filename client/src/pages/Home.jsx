import CurrentDate from "../components/date";
import CurrentWeather from "../components/weatherAPI/currentWeather";
import DemoGallery from "./DemoGallery";
import { useThemeContext } from "../contexts/ThemeProvider";
import { Outlet } from "react-router";

const Home = () => {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <div className="container">
            <div className="row mx-auto flex-nowrap">
                <div className="col-9">
                    <div className="row">
                        <CurrentDate name={'Keith'} />
                    </div>
                    <div className="row">
                        <CurrentWeather />
                    </div>
                </div>
                <div className="col-3">
                    <button                         
                        className={`btn btn-${theme === 'light' ? 'dark' : 'light'} theme-btn`}
                        onClick={toggleTheme}
                    >
                        Theme: {theme === 'dark' ? 'Dark' : 'Light'}
                    </button>
                </div>
            </div>
            <div className="demo-gallery-container">
                <DemoGallery />
            </div>
            <div className="demo-view-container">
                <Outlet />
            </div>
        </div>
    )

}
export default Home;