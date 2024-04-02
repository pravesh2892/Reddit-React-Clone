import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { RiCakeLine } from 'react-icons/ri'
import { BsFilePostFill, BsFilePost, BsFillFileEarmarkPostFill } from 'react-icons/bs'

import React from 'react'
import useThemeStore from '../../store/ThemeStore/useThemeStore'
import userLogInStore from '../../store/AuthenticationStore/userLogInStore'

export const AboutCommunityRHS = ({ communityData, communityPosts, isJoined }) => {

  const { isDarkMode } = useThemeStore();

  function getFormattedDate(timeStamp) {
    const date = new Date(timeStamp);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return formattedDate;
  }

  const {isLoggedIn} = userLogInStore();

  const loggedInUserDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails'));

  return (
    <Box position="sticky" top="14px" >
      <Flex
        justify="space-between"
        align="center"
        bg="brand.100"
        color={isDarkMode ? "#d7dadc" : "white"}
        p={3}
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="10pt" fontWeight={700}>About Community</Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>

      <Flex
        direction="column"
        bg={isDarkMode ? "#1a1a1b" : "white"}
        padding={3}
        borderRadius="0px 0px 4px 4px"
      >
        <Stack >
          <Flex align={'center'} width="100%" p={1} fontSize="10pt" fontWeight={500} color={isDarkMode && "#d7dadc"}>
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            <Text>Created at {getFormattedDate(communityData.createdAt)}</Text>
          </Flex>


          <Flex align={'center'} width="100%" p={1} fontSize="10pt" fontWeight={500} color={isDarkMode && "#d7dadc"}>
            <Icon as={BsFilePost} fontSize={18} mr={2} />
            {communityPosts && <Text >{communityPosts.length} Posts</Text>}
          </Flex>

           
          {isLoggedIn && isJoined && 
          (<Flex align={'center'} justify="center" width="100%" p={1} fontSize="10pt" fontWeight={700} color={isDarkMode && "#d7dadc"}>
            <Text >{communityData.owner._id === loggedInUserDetails._id ? "ADMIN" : "MEMBER"}</Text>
          </Flex>)
          }





        </Stack>

      </Flex>
    </Box>
  )
}
