import { Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import useLogInModalStore from '../../../store/ModalStore/LogInModalStore'
import useSignUpModalStore from '../../../store/ModalStore/SignUpModalStore';
import axios from 'axios';
import { getHeadersWithProjectID } from '../../utils/projectID';

export const SignUpInput = () => {

    const {setLogInModal} = useLogInModalStore();
    const {setSignUpModal} = useSignUpModalStore();

    const [signUpForm, setSignUpForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [buttonLoading, setButtonLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState(false);

    const createUser = async (userDetails)=>{
         const config = getHeadersWithProjectID();
         try{
           const response = await axios.post('https://academics.newtonschool.co/api/v1/user/signup', userDetails, config);
           console.log("response", response);
           setButtonLoading(false);
           setSignUpModal(false);
           setLogInModal(true);
         }
         catch(error){
            console.log('error', error);
            try{
            setErrorMessage(error.response.data.message);
            }
            catch(e){
                setErrorMessage(error.message);
            }
            setButtonLoading(false);

         }
    }

    function handleSignUpForm(e){
        e.preventDefault();
        setButtonLoading(true);
        console.log('name', signUpForm.name);
        console.log('email', signUpForm.email);
        console.log('password', signUpForm.password);

        let alphabetRegex = /^[a-zA-Z]+$/;

        const userName = signUpForm.name;

        if(!alphabetRegex.test(userName)){
            setErrorMessage('Name can only contain Aplhabets and must be atleast 3 characters long');
            setButtonLoading(false);
            return;
        }

        if(userName.length < 3){
            setErrorMessage('Name can only contain Aplhabets and must be atleast 3 characters long');
            setButtonLoading(false);
            return;
        }

        if(!signUpForm.email.includes('.')){
            setErrorMessage('Invalid Email');
            setButtonLoading(false);
            return;
        }

        

        if(signUpForm.password.length < 5){
            setErrorMessage('The Password must be atleast 5 characters long');
            setButtonLoading(false);
            return;
        }
        
        
       


        const userDetails = {
            name: signUpForm.name,
            email: signUpForm.email,
            password: signUpForm.password,
            appType: "reddit"
        }

        createUser(userDetails)
    }

    function handleInputChange(e){
        setErrorMessage(false);
        const {name, value} = e.target;


        setSignUpForm((prev)=>{
          return {...prev, [name]: value}
        })
    }

    function goToLogIn(){
        setSignUpModal(false);
        setLogInModal(true);
    }
  return (
    <Flex direction='column' align='center' width='100%' mt={4}>
    <form onSubmit={handleSignUpForm}>
        
       <Input
       type='text'
       name='name'
       placeholder='Name'
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
       color='red' 
       fontSize='10pt' 
       textAlign='center'
       >{errorMessage}</Text>}

       <Button type='submit'
       width='100%'
       height='34px'
       mt={2}
       mb={2}
       isLoading={buttonLoading}
       >Sign Up</Button>

     <Flex fontSize='10pt' justifyContent='center' mt={2}>
       <Text mr={1}>Already a Redditer?</Text>
       <Text 
       color='blue.500' 
       fontWeight='700'
       cursor='pointer'
       onClick={goToLogIn}
       >LOG IN</Text>
     </Flex>
    </form>

    </Flex>
  )
}
