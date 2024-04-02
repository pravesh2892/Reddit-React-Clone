import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { FaReddit } from 'react-icons/fa'
import userLogInStore from '../../store/AuthenticationStore/userLogInStore'
import useThemeStore from '../../store/ThemeStore/useThemeStore'
import { useNavigate } from 'react-router-dom'

export const CommentItem = ({comment, deleteComment}) => {

    const {isLoggedIn} = userLogInStore();
    const loggedInUserDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails') ) ;
    const {isDarkMode} = useThemeStore();
    const navigateTo = useNavigate();
   

    function timeStamp(timeString){
        const dateObject = new Date(timeString);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        const formattedDateWithTime = dateObject.toLocaleDateString('en-US', options);
        return formattedDateWithTime;
    }

    function redirectToProfile(profileId){
        
        navigateTo(`/profile/${profileId}`)
    }

    return (
        <Flex ml={8}>
            <Box mr={2}>
                <Icon as={FaReddit} fontSize={30} color="gray.300" />
            </Box>

            <Stack spacing={1}>
                <Stack direction="row" align="center" fontSize="8pt">
                    <Text fontWeight={700} 
                          color={isDarkMode &&  "#d7dadc"}
                           _hover={{color: "blue.500"}} 
                           cursor="pointer"
                           onClick={()=> redirectToProfile(comment.author)}
                           >
                            {comment.author}
                            </Text>
                    <Text color="gray.500">{timeStamp(comment.createdAt)}</Text>
                </Stack>

                <Text fontSize="10pt" color={isDarkMode &&  "#d7dadc"}>{comment.content}</Text>

                <Stack direction="row" align="center" cursor="pointer" color="gray.500">
                  <>
                   {/* <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
                    Edit
                   </Text> */}
                  {isLoggedIn && loggedInUserDetails._id === comment.author && <Text
                     fontSize="9pt"
                     _hover={{color: "blue.500"}}
                     onClick={()=>deleteComment(comment._id)}
                   >
                     Delete
                   </Text>}
                  </>
                </Stack>
            </Stack>
        </Flex>
    )
}
