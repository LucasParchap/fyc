import React, { Suspense } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import useProducts from './hooks/products/useProducts';
import Header from './components/Header';
import '../index.css';

const Catalogue = React.lazy(() => import('app1/App'));
const App = () => {
    const { products, loading, error } = useProducts();

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <Router>
            <div>
                <Header />
                <main>
                    <Suspense fallback={<div>Chargement du Catalogue...</div>}>
                        <Routes>
                            <Route path="*" element={<div>Page non trouvée</div>} />
                            <Route path="/" element={<Navigate to="/catalogue" replace />}/>
                            <Route path="/catalogue/*" element={<Catalogue products={products} loading={loading} />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default App;
