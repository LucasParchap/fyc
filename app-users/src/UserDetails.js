import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userUser from '../../shell/src/hooks/users/useUser';
import eventBus from 'shell/eventBus';

const translations = {
    fr: {
        email: "Email",
        phone: "Téléphone",
        address: "Adresse",
        street: "Rue",
        city: "Ville",
        zipcode: "Code Postal",
        geolocation: "Géolocalisation",
        latitude: "Latitude",
        longitude: "Longitude",
        security: "Sécurité",
        password: "Mot de Passe",
        back: "Retour",
        generalInfo: "Informations Générales",
    },
    en: {
        email: "Email",
        phone: "Phone",
        address: "Address",
        street: "Street",
        city: "City",
        zipcode: "Zip Code",
        geolocation: "Geolocation",
        latitude: "Latitude",
        longitude: "Longitude",
        security: "Security",
        password: "Password",
        back: "Back",
        generalInfo: "General Information",
    },
};

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, loading, error } = userUser(id);
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
        return <div className="flex items-center justify-center h-screen text-blue-500 text-lg">Chargement des informations de l'utilisateur...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-500 text-lg">Erreur : {error}</div>;
    }

    if (!user) {
        return <div className="flex items-center justify-center h-screen text-gray-500 text-lg">Utilisateur introuvable.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="p-4">
                <button
                    onClick={() => navigate(-1)}
                    className="py-2 px-6 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition"
                >
                    {t.back}
                </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1">
                <div className="max-w-4xl bg-white p-8 rounded-lg shadow-lg">

                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-blue-500 text-white w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                            {user.name.firstname[0]}{user.name.lastname[0]}
                        </div>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-800">
                                {user.name.firstname} {user.name.lastname}
                            </h1>
                            <p className="text-gray-600 text-lg">@{user.username}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">{t.generalInfo}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                            <p className="text-gray-700">
                                <strong>{t.email}:</strong> {user.email}
                            </p>
                            <p className="text-gray-700">
                                <strong>{t.phone}:</strong> {user.phone}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">{t.address}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                            <p className="text-gray-700">
                                <strong>{t.street}:</strong> {user.address.street} {user.address.number}
                            </p>
                            <p className="text-gray-700">
                                <strong>{t.city}:</strong> {user.address.city}
                            </p>
                            <p className="text-gray-700">
                                <strong>{t.zipcode}:</strong> {user.address.zipcode}
                            </p>
                            <p className="text-gray-700">
                                <strong>{t.geolocation}:</strong>
                                <br />
                                {t.latitude} {user.address.geolocation.lat}, {t.longitude} {user.address.geolocation.long}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">{t.security}</h2>
                        <p className="text-gray-700 text-center">
                            <strong>{t.password}:</strong> {'*'.repeat(user.password.length)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
