import React, { useEffect, useState } from 'react';
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { TiHome } from 'react-icons/ti';
import { FaReddit } from 'react-icons/fa'
import { MdError } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { FaEdit, FaRegComment } from 'react-icons/fa';
import { IoSearch } from "react-icons/io5";
import { PiShieldCheckeredFill } from "react-icons/pi";
import userLogInStore from '../../../store/AuthenticationStore/userLogInStore';
import { Communities } from './Communities';
import { useNavigate } from 'react-router-dom';
import { getHeadersWithProjectID } from '../../utils/projectID'
import axios from 'axios'
import useMenuButtonTextStore from '../../../store/NavigatorStore/useMenuButtonTextStore';
import useThemeStore from '../../../store/ThemeStore/useThemeStore';
import useUpdateDirectory from '../../../store/DirectoryStore/useUpdateDirectory';


export const Directory = () => {
  const { isLoggedIn, setIsLoggedIn } = userLogInStore();
  const { menuButtonText, setMenuButtonText } = useMenuButtonTextStore();
  const [createdCommunityData, setCreatedCommunityData] = useState(null); // user created community array 

  const communityFollowed = JSON.parse(sessionStorage.getItem('communityFollowed'));
  const [userFollowedCommunity, setUserFollowedCommunity] = useState(null);


  const { isDarkMode } = useThemeStore();

  const {updateDirectory} = useUpdateDirectory();

  const navigateTo = useNavigate();

  // this handleCommunityClick function passing it as prop in Communities.js this from there to CreatedCommunityList.js
  function handleCommunityClick(e, communityID) {

    console.log(e.target.innerText);
    const selectedRoute = e.target.innerText;

    if (selectedRoute === 'Home') {
      setMenuButtonText(selectedRoute);
      sessionStorage.setItem('menuButtonText', 'Home');
      navigateTo('/')
      return;
    }

    navigateTo(`/community/${communityID}`);
    setMenuButtonText(selectedRoute);  // setting the text of menu button on selecting community
    sessionStorage.setItem('menuButtonText', selectedRoute);
  }


  const loggedInUserDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails'));

  const getCreatedCommunityList = async () => {
    const config = getHeadersWithProjectID();

    try {
      const response = await axios.get('https://academics.newtonschool.co/api/v1/reddit/channel?limit=1000', config); // fetching all channels list
      //console.log("all communities list", response.data.data);
      const allChannels = response.data.data;
      const userCreatedChannels = allChannels.filter((item) => {   // filtering user created channels only
        return item.owner._id === loggedInUserDetails._id;
      })
      console.log('created channels', userCreatedChannels);
      setCreatedCommunityData(userCreatedChannels);             // seting user created channels to state

      // getting user followed communitys
      let followedChannelLists = [];
      if(communityFollowed !== null){

          for(let element of communityFollowed){
             let followedChannel = allChannels.find((item)=> item._id === element);
              followedChannelLists.push(followedChannel);
          }

          // console.log("followed communities", followedChannelLists); working fine
          setUserFollowedCommunity(followedChannelLists);
      }else{
        setUserFollowedCommunity(null);
      }


    }
    catch (error) {
      console.log("error in fetching communities", error.response);
    }
  }

  useEffect(() => {
    getCreatedCommunityList();
  }, [updateDirectory]);


  return (
    <Menu>
      {/* IF USER IS LOGGED IN THEN SHOW MENU BUTTON */}
      <MenuButton
        cursor='pointer'
        padding='0px 6px'
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ outline: "1px solid", outlineColor: isDarkMode ? "#343536" : "gray.300" }}
      >
        {isLoggedIn &&
          <Flex align='center'
            justify='space-between'
            width={{ base: "auto", lg: '200px' }}
          >
            <Flex align='center'>
              {/* <Icon as={menuButtonText === 'Home' ? TiHome : menuButtonText === 'Oops!!!' ? MdError : FaReddit} fontSize={24} mr={{ base: 1, md: 2 }} color={menuButtonText !== 'Home' ? "blue.400" : isDarkMode ? "#D7DADC" : "black"} /> */}
              {menuButtonText == 'Home' && <Icon as={TiHome} fontSize={24} mr={{ base: 1, md: 2 }} color={isDarkMode ? "#D7DADC" : "black"}/>}
             {menuButtonText.startsWith('r/') && <Icon as={FaReddit} fontSize={24} mr={{ base: 1, md: 2 }} color="blue.400" bg={isDarkMode && "white"} borderRadius="20px"/>}
              {menuButtonText == 'Create Post' && <Icon as={IoMdAdd} fontSize={24} mr={{ base: 1, md: 2 }} color={isDarkMode ? "#D7DADC" : "black"}/>}
              {menuButtonText == 'Edit Post' && <Icon as={FaEdit} fontSize={20} mr={{ base: 1, md: 2 }} color={isDarkMode ? "#D7DADC" : "black"}/>}
              {menuButtonText == 'Post' && <Icon as={FaRegComment} fontSize={20} mr={{ base: 1, md: 2 }} color={isDarkMode ? "#D7DADC" : "black"}/>}
              {menuButtonText == 'Search Result' && <Icon as={IoSearch} fontSize={24} mr={{ base: 1, md: 2 }} color={isDarkMode ? "#D7DADC" : "black"}/>}
              {menuButtonText == 'Premium' && <Icon as={PiShieldCheckeredFill} fontSize={24} mr={{ base: 1, md: 2 }} color="brand.100"/>}
              {menuButtonText == 'Profile' && <Image src='/images/ProfileWhiteAvatarIcon.png' width="30px" height="30px" mr={{ base: 1, md: 2 }} borderRadius="20px" objectFit="cover"/>}
              {menuButtonText == 'Oops!!!' && <Icon as={MdError} fontSize={24} mr={{ base: 1, md: 2 }} color="brand.100"/>}

              <Flex display={{ base: "none", lg: 'flex' }} >
                {/* BELOW IS MENU BUTTON TEXT */}
                <Text fontWeight={600}
                  fontSize='10pt'
                  color={isDarkMode && "#D7DADC"}
                >
                  {menuButtonText}
                </Text>
              </Flex>

            </Flex>
            {/* DROP-DOWN ARROW */}
            <ChevronDownIcon color={isDarkMode && "#D7DADC"} />
          </Flex>
        }
      </MenuButton>
      <MenuList bg={isDarkMode ? "#1a1a1b" : "white"} border={isDarkMode && "1px solid"} borderColor={isDarkMode && "#343536"} maxHeight="300px" overflowY={'auto'}>
        <Communities createdCommunityData={createdCommunityData} handleCommunityClick={handleCommunityClick} userFollowedCommunity={userFollowedCommunity} />
      </MenuList>
    </Menu>
  )
}
