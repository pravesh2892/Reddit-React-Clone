import { Flex, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RightContent } from './RightContent/RightContent'
import { Directory } from './Directory/Directory'
import userLogInStore from '../../store/AuthenticationStore/userLogInStore'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getHeadersWithProjectID } from '../utils/projectID'
import axios from 'axios'
import useMenuButtonTextStore from '../../store/NavigatorStore/useMenuButtonTextStore'
import { SearchInput } from './SearchInput'
import useThemeStore from '../../store/ThemeStore/useThemeStore'

export const Navbar = () => {

  const {isLoggedIn} = userLogInStore();
  const {menuButtonText, setMenuButtonText} = useMenuButtonTextStore();
  const location = useLocation();
  const navigateTo = useNavigate();
  const {isDarkMode}  = useThemeStore();

  console.log('isDarkMode', isDarkMode)

  function handleLogoClick(){
      navigateTo('/');
      sessionStorage.setItem('menuButtonText', 'Home');
      setMenuButtonText('Home');
  }

  useEffect(()=>{
    if(location.pathname === '/'){
      setMenuButtonText('Home');
    }
  }, [location.pathname])


  return (
    <Flex bg={isDarkMode ? "#1A1A1B" : 'white'} height='44px' 
          padding={{base: '6px 0px', md: '6px 12px'}}
          justify={{md: 'space-between'}}
          borderBottom={isDarkMode && '1px solid'}
          borderBottomColor={isDarkMode && '#343536'}
          position="sticky"
          top={0}
          zIndex="999"

          >

       {/* NAVBAR -> LOGO DIV  */}
       <Flex align='center'
             width={{base: "40px", md: "auto"}}
             mr={{base: 0, md: 2}}
             cursor='pointer'
             onClick={handleLogoClick}
             display={{base: isLoggedIn && 'none', md: 'flex'}}
             >
        <Image src="/images/redditFace.svg" height='30px'  />
        <Image src={isDarkMode ? "/images/redditWhiteText.svg" : "/images/redditText.svg"} 
        height={isDarkMode ? "16px" : "46px"}
        ml={isDarkMode && 1}
        //unset = oposite of none
        display={{base: 'none', md: 'unset'}}/>
       </Flex>
       
       {/* HOME ICON AND DIRECTORY */}
       {isLoggedIn && <Directory />}
       
       {/* NAVBAR -> SEARCHINPUT */}
       <SearchInput/>
     
       {/* LOGIN LOGOUT BUTTON OR USER PROFILE */}
       <RightContent/>

    </Flex>
  )
}
