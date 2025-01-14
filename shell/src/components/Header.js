import React, { Suspense } from 'react';

const Cart = React.lazy(() => import('app2/App'));

const Header = () => {
    return (
        <header className="bg-blue-600 text-white shadow-md">
            <div className="flex items-center justify-between py-4 px-6">
                <div className="text-2xl font-bold">
                    E-Shop
                </div>

                <div className="absolute right-6">
                    <Suspense fallback={<div>Chargement du Panier...</div>}>
                        <Cart />
                    </Suspense>
                </div>
            </div>
        </header>
    );
};

export default Header;
