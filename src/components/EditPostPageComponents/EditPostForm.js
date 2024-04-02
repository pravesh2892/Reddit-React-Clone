import { Flex, Icon, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoDocumentText } from "react-icons/io5"
import { CiEdit } from "react-icons/ci"
import { EditTextInput } from './EditTextInput'
import { getHeadersWithUserToken } from '../utils/headersWithUserToken'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useThemeStore from '../../store/ThemeStore/useThemeStore'

export const EditPostForm = ({ channelId, postDetails, postId }) => {

    console.log("channelId", channelId);
    console.log("postDetails", postDetails);

    const [textInputs, setTextInputs] = useState({
        title: postDetails.title,
        content: postDetails.content,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const navigateTo = useNavigate();
    const { isDarkMode } = useThemeStore();

    function handleInputChange(e) {
        if (errorMsg) {
            setErrorMsg('');
        }
        const { name, value } = e.target;

        setTextInputs((prev) => {
            return { ...prev, [name]: value }
        })


    }

    async function editPost(postData) {
        const config = getHeadersWithUserToken();
        try {
            const response = await axios.patch(`https://academics.newtonschool.co/api/v1/reddit/post/${postDetails._id}`, postData, config);
            console.log('post edited successfully', response);
            setIsLoading(false); // after successfull button loading false

            if (channelId) {
                navigateTo(`/community/${channelId}`); // redirect to community page
            }
            else if (postId) {
                navigateTo(`/comment/${postId}`); // redirect to comment page
            }
            else {
                navigateTo('/');  // redirect to home page
            }
        }
        catch (error) {
            console.log("failed to edit post", error);
            setIsLoading(false); // after fail also button loading false
        }
    }

    async function handleEditPost() {

        if (textInputs.title.length > 100) {
            setErrorMsg("Title characters can't be greater than 100");
            return;
        }

        setIsLoading(true); // post button loading true
        const postData = new FormData();

        postData.append('title', textInputs.title);
        postData.append('content', textInputs.content);

        // if(postDetails.images.length > 0) {
        //     console.log("appending image")
        //     postData.append('images', postDetails.images[0]);
        // }

        

        editPost(postData);



    }


    return (
        <Flex direction="column" bg={isDarkMode ? "#1a1a1b" : "white"} borderRadius={4} mt={2}>
            <Flex width="100%">
                <Flex
                    justify="center"
                    align="center"
                    flexGrow={1}
                    p="14px 0px"
                    fontWeight={700}
                    color={isDarkMode ? "#d7dadc" : "brand.100"}
                    borderBottom="2px solid"
                    borderBottomColor={isDarkMode ? "#d7dadc" : "brand.100"}
                >
                    <Flex align="center" height="20px" mr={2}>
                        <Icon as={CiEdit} />
                    </Flex>
                    <Text fontSize="10pt">Edit</Text>
                </Flex>

            </Flex>

            <Flex p={4}>
                <EditTextInput errorMsg={errorMsg} textInputs={textInputs} handleInputChange={handleInputChange} handleEditPost={handleEditPost} isLoading={isLoading} />
            </Flex>

        </Flex>
    )
}
