import {create} from "zustand";

export const useThemeStore=create((set)=>({
    theme:localStorage.getItem("converse-theme")|| "retro",
    setTheme:(theme)=>{
        localStorage.setItem("converse-theme",theme);
        set({theme});
    },
}));