import {create} from 'zustand'


const useLogInModalStore = create((set)=>{
    return {
        showLogInModal: false,
        setLogInModal: (newSign)=> set({
            showLogInModal: newSign
        }),
    }
});


export default useLogInModalStore;