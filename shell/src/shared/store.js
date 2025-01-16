import { create } from 'zustand';

const useLanguageStore = create((set) => ({
    language: 'fr',
    setLanguage: (newLanguage) => set({ language: newLanguage }),
}));

export default useLanguageStore;
