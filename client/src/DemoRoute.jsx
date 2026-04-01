import { useParams } from 'react-router-dom';
import { Suspense, useMemo } from 'react';
import { demos } from './demos/registry';

const DemoRoute = () => {
    const { demoSlug } = useParams();

    const demo = demos.find((d) => d.path === demoSlug);

    const Comp = useMemo(() => {
        if (!demo) return null;
        return demo.component;
    }, [demoSlug, demo]);

    if (!demo || !Comp) {
        return <div style={{ padding: 16 }}>Demo not found</div>;
    }

    return(
        <Suspense fallback={<div style={{ padding: 16 }}>Loading Demo...</div>}>
            <Comp />
        </Suspense>
    )
}

export default DemoRoute;