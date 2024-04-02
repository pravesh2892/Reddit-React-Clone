import {create} from 'zustand'


const useUpdateDirectory = create((set)=>{
    return {
        updateDirectory: true,
        setUpdateDirectory: (newSign)=> set({
            updateDirectory: newSign
        }),
    }
});


export default useUpdateDirectory;