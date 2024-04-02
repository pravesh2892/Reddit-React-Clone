import { Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import useLogInModalStore from '../../../store/ModalStore/LogInModalStore';
import useSignUpModalStore from '../../../store/ModalStore/SignUpModalStore';
import { getHeadersWithProjectID } from '../../utils/projectID';
import axios from 'axios';
import userLogInStore from '../../../store/AuthenticationStore/userLogInStore';

export const LoginInputs = () => {

    const {showLogInModal, setLogInModal} = useLogInModalStore();
    const {showSignUpModal, setSignUpModal} = useSignUpModalStore();
    const {isLoggedIn, setIsLoggedIn} = userLogInStore();


    const [loginForm, setLoginForm] = useState({
         email: '',
         password: '',
    });

    const [buttonLoading, setButtonLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const createUser = async (userDetails)=>{
        const config = getHeadersWithProjectID();

        try{
          const response = await axios.post('https://academics.newtonschool.co/api/v1/user/login', userDetails, config);
          console.log("response", response);
          setButtonLoading(false);
          setLogInModal(false);

          const token = response.data.token;
          if(token){
          sessionStorage.setItem('userToken', token);
          sessionStorage.setItem('loggedInUserDetails', JSON.stringify(response.data.data));
          setIsLoggedIn(true);

          }

        }
        catch(error){
           console.log('error', error);
           try {
             setErrorMessage(error.response.data.message);
             
           } catch (e) {
           
             setErrorMessage(error.message);
           }
           setButtonLoading(false);

        }
   }

    function handleLoginForm(e){
      e.preventDefault();
      setButtonLoading(true);
      const userDetails = {
        email: loginForm.email,
        password: loginForm.password,
        appType: "reddit"
      }

      createUser(userDetails);
    
    }

    function handleInputChange(e){
        setErrorMessage(false);
        const {name, value} = e.target;
        setLoginForm((prev)=>{
         return {...prev, [name]: value}
        })
     }

    function goToSignUp(){
        setLogInModal(false)
        setSignUpModal(true);
    }

  return (
    <Flex direction='column' align='center' width='100%' mt={4}>
     <form onSubmit={handleLoginForm}>
        <Input
        type='email'
        name='email'
        placeholder='email'
        onChange={handleInputChange}
        required
        mb={2}
        bg='gray.50'
        fontSize='10pt'
        _placeholder={{color: 'gray.500'}}
        _hover={{
            bg: 'white',
            border: "1px solid",
            borderColor: "blue.500",
        }}
        _focus={{
            outline: 'none',
            bg: 'white',
            border: '1px solid',
            borderColor: 'blue.500',
        }}
        />

        <Input
        type='password'
        name='password'
        placeholder='password'
        onChange={handleInputChange}
        required
        mb={2}
        bg='gray.50'
        fontSize='10pt'
        _placeholder={{color: 'gray.500'}}
        _hover={{
            bg: 'white',
            border: "1px solid",
            borderColor: "blue.500",
        }}
        _focus={{
            outline: 'none',
            bg: 'white',
            border: '1px solid',
            borderColor: 'blue.500',
        }}
        />
        
        {errorMessage && <Text 
        textAlign='center' 
        color='red' 
        fontSize='10pt'
        >{errorMessage}</Text>}

        <Button type='submit'
        width='100%'
        height='34px'
        mt={2}
        mb={2}
        isLoading={buttonLoading}
        >Log In</Button>
      <Flex fontSize='10pt' justifyContent='center' mt={2}>
        <Text mr={1}>New here?</Text>
        <Text 
        color='blue.500' 
        fontWeight='700'
        cursor='pointer'
        onClick={goToSignUp}
        >SIGN UP</Text>
      </Flex>
     </form>

     </Flex>
  )
}
