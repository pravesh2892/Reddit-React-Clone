import {create} from 'zustand'


const useMenuButtonTextStore = create((set)=>{
    
    const menuBtnText = sessionStorage.getItem('menuButtonText');
    let btnText;
    if(menuBtnText){
        btnText = menuBtnText;
    }
    else{
        btnText = 'Home';
    }
    return {
        menuButtonText: btnText,
        setMenuButtonText: (newSign)=> set({
            menuButtonText: newSign
        }),
    }
});


export default useMenuButtonTextStore;