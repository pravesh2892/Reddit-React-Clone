import { Button, useStatStyles } from '@chakra-ui/react'
import React from 'react'
import useSignUpModalStore from '../../../store/ModalStore/SignUpModalStore'
import useLogInModalStore from '../../../store/ModalStore/LogInModalStore';
import userLogInStore from '../../../store/AuthenticationStore/userLogInStore';

export const AuthButton = () => {
  const {showSignUpModal, setSignUpModal} = useSignUpModalStore();
    const {showLogInModal, setLogInModal} = useLogInModalStore();

    
    
  return (
    <>
     <Button variant="outline" height='28px' 
     display={{base: 'none', sm: "flex"}} 
     width={{base: "70px", md: "110px"}}
     mr={2}
     onClick={()=>setLogInModal(true)}
     >Login</Button>

     <Button variant='solid' height='28px'
     display={{base: 'none', sm: 'flex'}}
     width={{base: "70px", md: '110px' }}
     mr={2}
     onClick={()=>setSignUpModal(true)}
     >Sign Up</Button>

   
    </>
  )
}
