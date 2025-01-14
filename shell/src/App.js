import React, { Suspense } from 'react';
import useProducts from './hooks/useProducts';
import Header from './components/Header';
import '../index.css';

const Catalogue = React.lazy(() => import('app1/App'));
const App = () => {
    const { products, loading, error } = useProducts();

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <div>
            <Header />
            <main>
                <Suspense fallback={<div>Chargement d'App1...</div>}>
                    <Catalogue products={products} loading={loading} />
                </Suspense>
            </main>
        </div>
    );
};

export default App;
