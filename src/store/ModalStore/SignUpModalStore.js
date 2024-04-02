import {create} from "zustand";


const useSignUpModalStore = create((set)=>{
    return {
        showSignUpModal: false,
        setSignUpModal: (newSign)=> set({
            showSignUpModal: newSign
        }),
    }
});

export default useSignUpModalStore;