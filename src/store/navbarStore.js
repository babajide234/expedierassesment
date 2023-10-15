import create from 'zustand';
import { persist } from 'zustand/middleware';

const useNavbarStore = create(
  persist(
    (set) => ({
      isNavbarOpen: false,
      toggleNavbar: () => set((state) => ({ isNavbarOpen: !state.isNavbarOpen })),
    }),
    { name: 'navbar-storage' }
  )
);

export default useNavbarStore;
