import CurrentDate from "../components/date";
import CurrentWeather from "../components/weatherAPI/currentWeather";
import DemoGallery from "./DemoGallery";
import { useTheme } from '../hooks/useTheme';

const Home = () => {
    const { theme, toggleTheme } = useTheme();

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
                    <button onClick={toggleTheme}>
                        Theme: {theme === 'dark' ? 'Dark' : 'Light'}
                    </button>
                </div>
            </div>
            <div className="row mx-auto">
                <DemoGallery />
            </div>
        </div>
    )

}
export default Home;