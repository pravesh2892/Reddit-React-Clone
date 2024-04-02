import { Button, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { PostItem } from '../HomePageComponents/PostItem'
import { PostLoader } from '../LoadingComponents/PostLoader'
import { useNavigate } from 'react-router-dom'
import useThemeStore from '../../store/ThemeStore/useThemeStore'
import userLogInStore from '../../store/AuthenticationStore/userLogInStore'
import useSignUpModalStore from '../../store/ModalStore/SignUpModalStore'

export const CommunityPosts = ({ communityPosts, increaseVote, decreaseVote, channelId, deletePost, editPost, handleComment, isAlertOpen, setIsAlertOpen, isJoined }) => {

    const navigateTo = useNavigate();
    const { isDarkMode } = useThemeStore();
    const {isLoggedIn} = userLogInStore();
    const {setSignUpModal} = useSignUpModalStore();


    function handleAddAPostButton() {
        if (!isLoggedIn) {
            setSignUpModal(true);
            return;
        }

        // Before creating post check if user joined community or not only in community page
        if (channelId) {

            if (!isJoined) {
                setIsAlertOpen(true);
                setTimeout(() => {
                    setIsAlertOpen(false);
                }, 2000)
                return;
            }

        }

        //   navigateTo(`/submitpost`, {state: {channelId}})
        //  if a logged in user 
        navigateTo('/submitpost', { state: { channelId } });
    }


    return (
        <>
            <Stack>
                {communityPosts ? communityPosts.length > 0 ? communityPosts.map((post, index) => (
                    <PostItem key={index} post={post} increaseVote={increaseVote} decreaseVote={decreaseVote} deletePost={deletePost} editPost={editPost} handleComment={handleComment} />

                )) : (
                    // IF THERE ARE NO POSTS SHOW ADD A POST BUTTON
                    <Stack padding={10} align="center" justify="center" border="1px dashed" borderColor={isDarkMode ? "#343536" : "black"} borderRadius="4px" height="300px">
                        <Text fontSize="15pt" fontWeight={700}>There are no posts in this subreddit</Text>
                        <Button height="34px" onClick={handleAddAPostButton}>Add a post</Button>
                    </Stack>
                ) : (
                    <PostLoader />
                )
                }
            </Stack>
        </>
    )
}
