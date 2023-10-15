import create from 'zustand';

const useUserStore = create((set) => ({
  user: {},
  setUser: (newUser) => set({ user: newUser }),
}));

export default useUserStore;
