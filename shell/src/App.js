import React, { Suspense } from 'react';
import {HashRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import useProducts from './hooks/products/useProducts';
import Header from './components/Header';
import '../index.css';
import useUsers from "./hooks/users/useUsers";

const Catalogue = React.lazy(() => import('app1/App'));
const Users = React.lazy(() => import('app_users/App'));
const App = () => {
    const { products, productsLoading, productsError } = useProducts();
    const { users, usersLoading, usersError } = useUsers();

    if (productsError) {
        return <div>Erreur : {productsError}</div>;
    }
    if (usersError) {
        return <div>Erreur : {usersError}</div>;
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
                            <Route path="/catalogue/*" element={<Catalogue products={products} loading={productsLoading} />} />
                            <Route path="/users/*" element={<Users users={users} loading={usersLoading} />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default App;
