import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react'
import useThemeStore from '../../store/ThemeStore/useThemeStore';


export const FilterTabItem = ({ item, isSelected, setSelectedFilterTab }) => {

   const {isDarkMode} = useThemeStore();

    return (
        <Flex
            justify="center"
            align="center"
            p="4px 6px"
            fontWeight={700}
            cursor="pointer"
            _hover={{ bg: isDarkMode ? "#343536" : "gray.200" }}
            color={isSelected ? isDarkMode ? "#d7dadc" : "blue.500" : isDarkMode ? "#818384" : "gray.500"}
            borderRadius={20}
            bg={isSelected ? isDarkMode ? "#343536" : "gray.100" : "none"}
            onClick={()=> setSelectedFilterTab(item.tabName)}
          
        >
            <Icon as={item.icon} fontSize="24px" mr={1} />
            <Text fontSize="12pt">{item.tabName}</Text>
        </Flex>
    )
}
