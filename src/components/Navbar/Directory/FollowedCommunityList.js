import React from 'react'
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../../store/ThemeStore/useThemeStore';
import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import {FaReddit} from "react-icons/fa"

export const FollowedCommunityList = ({community, handleCommunityClick}) => {

    const navigateTo = useNavigate();
  const {isDarkMode} = useThemeStore();

  function removeSpace(str) {
    let removedSpacesText = str.split(" ").join("");
    return removedSpacesText
  }


  return (
    <MenuItem
    width="100%"
    fontSize="10pt"
    bg={isDarkMode && "#1a1a1b"}
    color={isDarkMode && "#d7dadc"}
    _hover={{ bg: isDarkMode ? "#343536" : "gray.100" }}
    onClick={(e)=> handleCommunityClick(e, community._id)}
     >
      <Flex align="center"> 
        <Icon as={FaReddit} fontSize={20} mr={2} color="brand.100" />
        {`r/${removeSpace(community.name)}`}
      </Flex>

   </MenuItem>
  )
}
