// store.js
import create from 'zustand';

const useStore = create((set) => ({
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    moveBackground: (x, y) => set({ backgroundPositionX: x, backgroundPositionY: y }),
}));

export default useStore;
