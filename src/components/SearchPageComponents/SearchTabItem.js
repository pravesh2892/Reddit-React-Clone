import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import useThemeStore from '../../store/ThemeStore/useThemeStore'

export const SearchTabItem = ({item, isSelected, setSelectedTab}) => {
  const {isDarkMode} = useThemeStore();

  return (
    <Flex
     justify="center"
     align="center"
     flexGrow={1}
     p="14px 0px"
     fontWeight={700}
     cursor="pointer"
     _hover={{bg: isDarkMode ? "#272729" : "gray.100"}}
     bg={isSelected ? isDarkMode ? "#343536" : "white" :  "none" }
     onClick={()=>setSelectedTab(item.title)}
    >
       <Text fontSize="12pt" color={isDarkMode && "#d7dadc"}>{item.title}</Text>
    </Flex>
  )
}
