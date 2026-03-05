import { Routes, Route } from 'react-router-dom';
import DemoRoute from './DemoRoute';
import Home from './pages/Home';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demos/*" element={<DemoRoute />} />
            <Route path="*" element={<div style={{ padding: 16 }}>Not Found</div>}/>
        </Routes>
    );
}

export default App;

