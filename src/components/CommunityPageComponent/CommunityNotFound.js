import React, { useEffect } from 'react'
import { Flex, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useMenuButtonTextStore from '../../store/NavigatorStore/useMenuButtonTextStore';
import useThemeStore from '../../store/ThemeStore/useThemeStore';

export const CommunityNotFound = () => {

  const {menuButtonText, setMenuButtonText} = useMenuButtonTextStore();
  const {isDarkMode} = useThemeStore();

  useEffect(()=>{
   setMenuButtonText('Oops!!!')
  }, [])

  
  return (
    <Flex
     direction="column"
     justifyContent='center'
     alignItems='center'
     minHeight='60vh'
     color={isDarkMode && "#d7dadc"}
    >
      Sorry, that community or User does not exist or has been banned
      <Link to='/'>
        <Button mt={4}>
            GO HOME
        </Button>
      </Link>
    </Flex>
  )
}
