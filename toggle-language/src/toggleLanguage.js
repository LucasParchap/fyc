import React, {useState, useEffect} from 'react';
import eventBus from 'shell/eventBus';
const ToggleLanguage = () => {
    const [language, setLanguage] = useState('fr');

    useEffect(() => {
        const handleLanguageChange = (newLanguage) => {
            setLanguage(newLanguage);
        };

        eventBus.on('language-change', handleLanguageChange);

        return () => {
            eventBus.off('language-change', handleLanguageChange);
        };
    }, []);

    const toggleLanguage = () => {
        const newLanguage = language === 'fr' ? 'en' : 'fr';
        setLanguage(newLanguage);
        eventBus.emit('language-change', newLanguage);
    };

    return (
        <div className="flex items-center cursor-pointer">
            <span
                className={`mr-3 font-semibold ${
                    language === 'fr' ? 'text-blue-500' : 'text-gray-500'
                }`}
            >
                FR
            </span>
            <label className="relative inline-block w-12 h-6">
                <input
                    type="checkbox"
                    checked={language === 'en'}
                    onChange={toggleLanguage}
                    className="hidden"
                />
                <span
                    className={`absolute inset-0 bg-gray-300 rounded-full transition ${
                        language === 'en' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                ></span>
                <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transform transition ${
                        language === 'en' ? 'translate-x-6' : 'translate-x-0'
                    }`}
                ></span>
            </label>
            <span
                className={`ml-3 font-semibold ${
                    language === 'en' ? 'text-blue-500' : 'text-gray-500'
                }`}
            >
                EN
            </span>
        </div>
    );
};

export default ToggleLanguage;
