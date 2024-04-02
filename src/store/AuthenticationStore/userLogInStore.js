import {create} from 'zustand';


const userLogInStore = create((set)=>{

    let isUserLoggedIn;
    const token = sessionStorage.getItem('userToken');
    if(token){
        isUserLoggedIn = true;
    }else{
        isUserLoggedIn = false;
    }

    return {
        isLoggedIn: isUserLoggedIn,
        setIsLoggedIn: (newValue) => set({
            isLoggedIn: newValue
        })
    }
})

export default userLogInStore;