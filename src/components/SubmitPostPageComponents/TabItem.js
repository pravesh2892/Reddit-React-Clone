import { Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import useThemeStore from '../../store/ThemeStore/useThemeStore';

export const TabItem = ({item, isSelected, setSelectedTab}) => {

  const {isDarkMode} = useThemeStore();
  return (
    <Flex
     justify="center"
     align="center"
     flexGrow={1}
     p="14px 0px"
     fontWeight={700}
     cursor="pointer"
     _hover={{bg: isDarkMode ? "#343536" : "gray.100"}}
     color={isSelected ? isDarkMode ? "#d7dadc" : "brand.100" : isDarkMode ? "#818384" : "gray.500"}
     borderWidth={isSelected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
     borderColor={isDarkMode ? "#343536" : "gray.200"}
     borderBottomColor={isSelected ? isDarkMode ? "#d7dadc" : "brand.100" : isDarkMode ? "#343536" : "gray.200"}
     onClick={()=>setSelectedTab(item.title)}
    >
       <Flex align="center" height="20px" mr={2}>
             <Icon as={item.icon} />
       </Flex>
       <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  )
}
