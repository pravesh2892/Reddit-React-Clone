import React from 'react'
import { Flex, Icon, Text, Image} from '@chakra-ui/react'
import { FaReddit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../../store/ThemeStore/useThemeStore';

export const CommunitySearchItem = ({community}) => {

    const {isDarkMode} = useThemeStore();

    function removeSpace(str) {
        let removedSpacesText = str.split(" ").join("");
        return removedSpacesText
      }

      const navigateTo = useNavigate();

    return (
        <Flex width="100%"
            bg={isDarkMode ? "#1a1a1b" : "white"}
            borderBottom="1px solid"
            borderBottomColor={isDarkMode ? "#343536" : "gray.300"}
            p="14px"
            _hover={{
                border: "1px solid",
                borderColor: "gray.500",
            }}
            cursor="pointer"
            align="center"
            onClick={() => navigateTo(`/community/${community._id}`)}
        >
            {community.image ? <Image src={community.image}  mr={4} height="40px" width="40px" objectFit="cover" borderRadius="50%"/> 
            : 
            <Icon as={FaReddit} fontSize="40px" mr={4} color="blue.400" />}
            <Text color={isDarkMode && "#d7dadc"} fontWeight={600} _hover={{color: "blue.500"}}>r/{removeSpace(community.name)}</Text>

        </Flex>
    )
}
