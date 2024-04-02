import React from 'react'
import { useNavigate } from 'react-router-dom';
import useSignUpModalStore from '../../store/ModalStore/SignUpModalStore';
import userLogInStore from '../../store/AuthenticationStore/userLogInStore';
import { getHeadersWithUserToken } from '../utils/headersWithUserToken';
import axios from 'axios';
import { Stack, Text } from '@chakra-ui/react';
import { PostItem } from '../HomePageComponents/PostItem';
import { PostLoader } from '../LoadingComponents/PostLoader';
import useThemeStore from '../../store/ThemeStore/useThemeStore';

export const UserPosts = ({ userPosts, setUserPosts, fetchPosts }) => {

    const navigateTo = useNavigate();
    const {setSignUpModal} = useSignUpModalStore();
    const {isLoggedIn} = userLogInStore();
    const {isDarkMode} = useThemeStore();

    const increaseVote = async (postId) => {

        if (!isLoggedIn) {
            setSignUpModal(true);
            return;
        }

        const config = getHeadersWithUserToken();
        // in newton doc body is not given but here it's failing if we don't pass body
        const body = {
            appType: "reddit"
        }

        try {
            const response = await axios.post(`https://academics.newtonschool.co/api/v1/reddit/like/${postId}`, body, config);
            console.log("upVoted post successfully", response.data);
            fetchPosts();  
        }
        catch (error) {
            console.log('fail to upvote', error.response);
        }
    }

    const decreaseVote = async (postId) => {

        if (!isLoggedIn) {
            setSignUpModal(true);
            return;
        }

        const config = getHeadersWithUserToken();
        // in newton doc body is not given but here it's failing if we don't pass body
        const body = {
            appType: "reddit"
        }

        try {
            const response = await axios.delete(`https://academics.newtonschool.co/api/v1/reddit/like/${postId}`, config);
            console.log("downVoted post successfully", response.data);
            fetchPosts(); 
        }
        catch (error) {
            console.log('fail to downVote', error.response);
        }
    }

    async function deletePost(postId) {

        const config = getHeadersWithUserToken();

        try {
            const response = await axios.delete(`https://academics.newtonschool.co/api/v1/reddit/post/${postId}`, config);
            console.log("post deleted successfully", response);
            fetchPosts();  
        }
        catch (error) {
            console.log('error in deleting post', error);
        }

    }

    function editPost(postDetails) {

        navigateTo('/editPost', { state: { postDetails } });

    }

    function handleComment(postDetails) {
        navigateTo(`/comment/${postDetails._id}`, { state: { postDetails } });
    }


    return (
        <Stack>
        {userPosts ? userPosts.length > 0 ? userPosts.map((post, index)=>(
            <PostItem post={post} key={index} increaseVote={increaseVote} decreaseVote={decreaseVote} deletePost={deletePost} editPost={editPost} handleComment={handleComment} />
            
        )): <Text color={isDarkMode && "#d7dadc"}>No posts</Text> : <PostLoader/>}
    </Stack>
    )
}
