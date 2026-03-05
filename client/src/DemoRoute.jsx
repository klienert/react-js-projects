import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { demos } from './demos/registry';

const DemoRoute = () => {
    return(
        <Suspense fallback={<div style={{ padding: 16 }}>Loading demo...</div>}>
            <Routes>
                {demos.map((d) => {
                    const Comp = lazy(d.component);
                    return <Route key={d.route} path={d.path} element={<Comp />} />;
                })}
                <Route path="*" element={<div style={{ padding: 16 }}>Demo not found</div>} />
            </Routes>
        </Suspense>
    )
}

export default DemoRoute;