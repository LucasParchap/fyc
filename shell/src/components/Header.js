import React, { Suspense } from 'react';

const Cart = React.lazy(() => import('app2/App'));
const LanguageToggle = React.lazy(() => import('toggleLanguage/App'));

const Header = () => {
    return (
        <header className="bg-blue-600 text-white shadow-md">
            <div className="flex items-center justify-between py-4 px-6">
                <div className="text-2xl font-bold">
                    E-Shop
                </div>
                <div className="flex items-center space-x-6 absolute right-6">
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
