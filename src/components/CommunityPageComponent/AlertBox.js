import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'
import useThemeStore from '../../store/ThemeStore/useThemeStore'

export const AlertBox = () => {

  const {isDarkMode} = useThemeStore();
  

  return (
  
    <Alert status='info' 
         borderRadius="4px" 
         border="1px solid" 
         borderColor={isDarkMode ? "#343536" : "gray.300"} 
         position="fixed" bottom="30px"
         width="30%"
         ml="50px"
         transition="all 0.5s ease-in-out"
         
         >
    <AlertIcon />
     You haven't Joined the community
  </Alert>
 
  )
}
