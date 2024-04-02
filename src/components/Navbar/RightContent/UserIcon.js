import { Flex, Icon } from '@chakra-ui/react'
import React from 'react'
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import {  useNavigate } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import {
    IoFilterCircleOutline,
    IoNotificationsOutline,
    IoVideocamOutline,
} from "react-icons/io5";
import useThemeStore from '../../../store/ThemeStore/useThemeStore';

export const UserIcon = () => {
    const navigate = useNavigate();

    const {isDarkMode} = useThemeStore();
    return (
        <Flex display={{base: 'none', md: 'flex'}}>

            <Flex
                display={{ base: 'none', md: 'flex' }}
                align="center"
                borderRight='1px solid'
                borderColor='gray.200'
            >
                <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: isDarkMode ? "#343536" : 'gray.200' }}
                    color={isDarkMode && "#d7dadc"}
                >
                    <Icon as={BsArrowUpRightCircle} fontSize={20} onClick={()=>{ navigate("/commingsoon")}}/>
                </Flex>
                <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: isDarkMode ? "#343536" : 'gray.200' }}
                    color={isDarkMode && "#d7dadc"}
                >
                    <Icon as={IoFilterCircleOutline} fontSize={22} onClick={()=>{ navigate("/commingsoon")}} />
                </Flex>
                <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: isDarkMode ? "#343536" : 'gray.200' }}
                    color={isDarkMode && "#d7dadc"}
                >
                    <Icon as={IoVideocamOutline} fontSize={22} onClick={()=>{ navigate("/commingsoon")}}/>
                </Flex>

            </Flex>
            <>
            <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: isDarkMode ? "#343536" : 'gray.200' }}
                    color={isDarkMode && "#d7dadc"}
                >
                    <Icon as={BsChatDots} fontSize={20} onClick={()=>{ navigate("/commingsoon")}}/>
                </Flex>
            <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: isDarkMode ? "#343536" : 'gray.200' }}
                    color={isDarkMode && "#d7dadc"}
                >
                    <Icon as={IoNotificationsOutline} fontSize={20} onClick={()=>{ navigate("/commingsoon")}}/>
                </Flex>
            <Flex
                   display={{base: 'none', md: 'flex'}}
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: isDarkMode ? "#343536" : 'gray.200' }}
                    color={isDarkMode && "#d7dadc"}
                >
                    <Icon as={GrAdd} fontSize={20} onClick={()=>{ navigate("/commingsoon")}} />
                </Flex>
            
            </>


        </Flex>
    )
}
