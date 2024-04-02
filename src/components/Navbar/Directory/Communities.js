import React, { useEffect, useState } from 'react'
import { CreateCommunityModal } from '../../Modal/CreatCommunity/CreateCommunityModal'
import { Box, Flex, Icon, MenuItem, Text } from '@chakra-ui/react'
import { GrAdd } from 'react-icons/gr'
import { TiHome } from 'react-icons/ti'
import { FaArrowUpRightDots } from 'react-icons/fa6'
import { CreatedCommunityList } from './CreatedCommunityList'
import { getHeadersWithProjectID } from '../../utils/projectID'
import axios from 'axios'
import useMenuButtonTextStore from '../../../store/NavigatorStore/useMenuButtonTextStore'
import useThemeStore from '../../../store/ThemeStore/useThemeStore'
import { FollowedCommunityList } from './FollowedCommunityList'


export const Communities = ({ createdCommunityData, handleCommunityClick, userFollowedCommunity }) => {


  const [showCommunityModal, setCommunityModal] = useState(false);
  const { menuButtonText, setMenuButtonText } = useMenuButtonTextStore();

  const { isDarkMode } = useThemeStore();

  console.log("followed communities in tesing ", userFollowedCommunity);
  


  return (
    <>
    {/* CREATE COMMUNITY MODAL */}
      <CreateCommunityModal showCommunityModal={showCommunityModal} handleClose={() => setCommunityModal(false)} />

      {/* MENU BOX */}
      <Box mt={3} mb={3} >

         {/* FEEDS HOME POPULAR */}
         <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          FEEDS
        </Text>
        <MenuItem
          width='100%'
          fontSize='10pt'
          bg={isDarkMode && "#1a1a1b"}
          color={isDarkMode && "#d7dadc"}
          _hover={{ bg: isDarkMode ? "#343536" : "gray.100" }}
          onClick={(e) => handleCommunityClick(e)}
        >
          <Flex align='center'>
            <Icon as={TiHome}
              fontSize={20}
              mr={2}
            />
            Home
          </Flex>
        </MenuItem>

        <MenuItem
          width='100%'
          fontSize='10pt'
          bg={isDarkMode && "#1a1a1b"}
          color={isDarkMode && "#d7dadc"}
          _hover={{ bg: isDarkMode ? "#343536" : "gray.100" }}
        >
          <Flex align='center'>
            <Icon as={FaArrowUpRightDots}
              fontSize={20}
              mr={2}
            />
            Poplular
          </Flex>
        </MenuItem>


        {/* MODERATING COMMUNITIES LIST */}
        <Text pl={3} mt={2} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          MODERATING
        </Text>

        {createdCommunityData && createdCommunityData.length > 0 &&
          createdCommunityData.map((community, index) => (

            <CreatedCommunityList key={index} community={community} handleCommunityClick={handleCommunityClick} />
          ))

        }

        {/* CREATE COMMUNITY OPTION */}
        <MenuItem
          width='100%'
          fontSize='10pt'
          bg={isDarkMode && "#1a1a1b"}
          color={isDarkMode && "#d7dadc"}
          _hover={{ bg: isDarkMode ? "#343536" : "gray.100" }}
          onClick={() => setCommunityModal(true)}
        >
          <Flex align='center'>
            <Icon as={GrAdd}
              fontSize={20}
              mr={2}
            />
            Create Community
          </Flex>
        </MenuItem>

        {/* FOLLOWED COMMUNITY */}
        {userFollowedCommunity && 
         <>
        <Text pl={3} mb={1} mt={2} fontSize="7pt" fontWeight={500} color="gray.500">
          YOUR COMMUNITIES
        </Text>
        {userFollowedCommunity.length > 0 && userFollowedCommunity.map((community, index)=>(
          <FollowedCommunityList key={index} community={community} handleCommunityClick={handleCommunityClick} />
        ))}
        </>
        }


       
      </Box>
    </>
  )
}
