import React from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Flex,
  Icon,
  Text,
  Center,
  Switch,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import userLogInStore from '../../../store/AuthenticationStore/userLogInStore'
import { FaRedditSquare, FaRedditAlien } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin, MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import useThemeStore from '../../../store/ThemeStore/useThemeStore';
import { useNavigate } from 'react-router-dom';


export const UserMenuModal = () => {
  const { isLoggedIn, setIsLoggedIn } = userLogInStore();
  const {isDarkMode, setIsDarkMode} = useThemeStore();

  const navigateTo = useNavigate();

  function handleLogout(){
    // sessionStorage.removeItem('userToken');
    // sessionStorage.removeItem('loggedInUserDetails');
    sessionStorage.clear();
    navigateTo('/');
    setIsLoggedIn(false); 
    setIsDarkMode(false);
  }

  function getUserName(){
   const userDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails'));
   return userDetails.name;
  }

  function switchTheme(){
  
    sessionStorage.setItem('currentTheme', !isDarkMode);
    setIsDarkMode(!isDarkMode);


  }

  function handleProfileClick(){
    navigateTo(`/profile/${loggedInUserDetails._id}`)
  }

  const loggedInUserDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails'))

  return (
    <Menu>
      {/* IF USER IS LOGGED IN THEN SHOW MENU BUTTON */}
      {isLoggedIn && <MenuButton
        cursor='pointer'
        padding='0px 6px'
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: isDarkMode ? "#343536" : "gray.300" }}
      >
       
          <Flex align='center'>
            <Flex align='center'>
              <>
                {/* LOGO */}
                <Icon as={FaRedditSquare}
                  fontSize={24}
                  color="gray.300"
                />
                {/* NAME AND KARMA */}
                <Flex
                   direction='column'
                   display={{base: 'none', lg: 'flex'}}
                   fontSize='8pt'
                   align='flex-start'
                   mr={8}
                   ml={1}

                  >
                   <Text fontWeight={700} fontSize='10pt' color={isDarkMode && "#d7dadc"}>
                    {getUserName()}
                   </Text>
                   <Flex>
                    <Icon as={IoSparkles} color='brand.100' mr={1}/>
                    <Text color='gray.400' >1 karma</Text>
                   </Flex>
                </Flex>
              </>

              {/* DROP-DOWN ARROW */}
              <ChevronDownIcon color={isDarkMode && "#d7dadc"} />
            </Flex>
          </Flex>
        
      </MenuButton>}

      {/* MenuList -> Profile, Darkmode, Logout */}
      <MenuList border={isDarkMode ? "1px solid #343536" : "none" } bg={isDarkMode ? "#1a1a1b" : "white"}>
        <MenuItem
          fontSize='10pt'
          fontWeight={700}
          bg={isDarkMode ? "#1a1a1b" : "white"}
          color={isDarkMode && "#d7dadc"}
          _hover={{ bg: isDarkMode ? "#343536" : "blue.500", color: 'white' }}
          onClick={handleProfileClick}
        >
          <Flex align="center">
            <Icon as={CgProfile}
              fontSize={20} mr={2}
            />
            Profile
          </Flex>
        </MenuItem>
         <MenuDivider/>
         <MenuItem
          fontSize='10pt'
          fontWeight={700}
          bg={isDarkMode ? "#1a1a1b" : "white"}
          color={isDarkMode && "#d7dadc"}
          _hover={{ bg: isDarkMode ? "#343536" : "blue.500", color: 'white' }}
          onClick={switchTheme}
        >
          <Flex align="center" >
          <Icon as={isDarkMode ? CiLight : MdDarkMode}
              fontSize={20} mr={2}
            />
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Flex>
        </MenuItem>
         <MenuDivider/>
        <MenuItem
          fontSize='10pt'
          fontWeight={700}
          bg={isDarkMode ? "#1a1a1b" : "white"}
          color={isDarkMode && "#d7dadc"}
          _hover={{ bg: isDarkMode ? "#343536" : "blue.500", color: 'white' }}
          onClick={handleLogout}
        >
          <Flex align="center">
            <Icon as={MdOutlineLogin}
              fontSize={20} mr={2}
            />
            Log Out
          </Flex>
        </MenuItem>



      </MenuList>
    </Menu>
  )
}
