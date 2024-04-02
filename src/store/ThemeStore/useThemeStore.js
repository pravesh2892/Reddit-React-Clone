import {create} from 'zustand'

 const useThemeStore = create((set)=>{
    // by doing json.parse it is giving boolean type other wise it was giving me string type
   const currentTheme = JSON.parse(sessionStorage.getItem('currentTheme'));

   let selectedTheme;
    if(currentTheme){
      selectedTheme = true;
    }
    else{
        selectedTheme = false;
    }

    return{
        isDarkMode: selectedTheme,
        setIsDarkMode: (bolValue) => set({
           isDarkMode: bolValue
        }),
    }
});

export default useThemeStore;
