import { Routes, Route } from 'react-router-dom';
import DemoRoute from './DemoRoute';
import Home from './pages/Home';
import ThemeProvider from './contexts/ThemeProvider';
import DemoGallery from './pages/DemoGallery';

const App = () => {
    return (
        <ThemeProvider>
            <Routes>                
                <Route path="/" element={<Home />}>
                    <Route path="/demos/:demoSlug" element={<DemoRoute />} />
                </Route>
                <Route path="*" element={<div style={{ padding: 16 }}>Not Found</div>}/>
            </Routes>
        </ThemeProvider>
    );
}

export default App;