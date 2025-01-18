import React, { useEffect, useState } from 'react';
import eventBus from 'shell/eventBus';
import { Routes, Route, useNavigate} from 'react-router-dom';
import UserDetails from "./UserDetails";

const translations = {
    fr: {
        email: "Email",
        phone: "Téléphone",
        address: "Adresse",
        viewDetail: "Voir le détail",
    },
    en: {
        email: "Email",
        phone: "Phone",
        address: "Address",
        viewDetail: "View detail",
    },
};
const Users = ({ users, loading }) => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('fr');

    const t = translations[language];

    useEffect(() => {
        const handleLanguageChange = (newLanguage) => {
            setLanguage(newLanguage);
        };
        eventBus.on('language-change', handleLanguageChange);
        return () => {
            eventBus.off('language-change', handleLanguageChange);
        };
    }, []);

    if (loading) {
        return <div className="text-center text-blue-500">Chargement des utilisateurs...</div>;
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-6">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow bg-white flex flex-col h-full"
                            >
                                <div className="flex flex-col items-center mb-4">
                                    <h3 className="text-xl font-semibold mt-2 text-gray-800">
                                        {user.name.firstname} {user.name.lastname}
                                    </h3>
                                    <p className="text-gray-600 text-sm">@{user.username}</p>
                                </div>

                                <div className="flex-grow">
                                    <p className="text-gray-700 text-sm mb-2">
                                        <strong>{t.email}:</strong> {user.email}
                                    </p>
                                    <p className="text-gray-700 text-sm mb-2">
                                        <strong>{t.phone}:</strong> {user.phone}
                                    </p>
                                    <p className="text-gray-700 text-sm mb-4">
                                        <strong>{t.address}:</strong> {user.address.street} {user.address.number}, {user.address.city} ({user.address.zipcode})
                                    </p>
                                    <button
                                        onClick={() => navigate(`/users/details/${user.id}`)}
                                        className="w-full py-3 bg-gray-100 text-blue-500 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                                    >
                                        {t.viewDetail}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            />
            <Route path="details/:id" element={<UserDetails />} />
        </Routes>
    );
};

export default Users;
