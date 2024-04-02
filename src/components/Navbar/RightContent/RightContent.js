import { Button, Flex } from '@chakra-ui/react'
import { AuthButton } from './AuthButton'
import { SignUpModal } from '../../Modal/SignUpModal/SignUpModal'
import { LoginModal } from '../../Modal/LoginModal/LoginModal'
import userLogInStore from '../../../store/AuthenticationStore/userLogInStore'
import { UserIcon } from './UserIcon'
import { UserMenuModal } from './UserMenuModal'

export const RightContent = () => {
  // const {showSignUpModal, setSignUpModal} = useSignUpModalStore
  const {isLoggedIn, setIsLoggedIn} = userLogInStore();
   
  

  return (
    <>
     <SignUpModal/>
    <LoginModal/>

    <Flex justify='center' align='center'>
    {isLoggedIn ? 
    <UserIcon />
    :
     <AuthButton/>}
     <UserMenuModal/>
    </Flex>
    </>
  )
}
