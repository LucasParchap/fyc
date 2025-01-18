import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';

const Cart = React.lazy(() => import('app2/App'));
const LanguageToggle = React.lazy(() => import('toggleLanguage/App'));

const Header = () => {
    return (
        <header className="bg-blue-600 text-white shadow-md">
            <div className="flex items-center justify-between py-4 px-6">
                <div className="flex items-center space-x-8">
                    <div className="text-2xl font-bold">
                        E-Shop
                    </div>
                    <Link
                        to="/catalogue"
                        className="text-lg font-medium hover:underline hover:text-gray-200 transition-all"
                    >
                        Catalogue
                    </Link>
                </div>
                <div className="flex items-center space-x-6">
                    <Suspense fallback={<div>Chargement du Toggle...</div>}>
                        <LanguageToggle />
                    </Suspense>
                    <Suspense fallback={<div>Chargement du Panier...</div>}>
                        <Cart />
                    </Suspense>
                </div>
            </div>
        </header>
    );
};
export default Header;
