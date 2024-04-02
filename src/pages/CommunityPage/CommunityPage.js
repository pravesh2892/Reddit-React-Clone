import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getHeadersWithUserToken } from '../../components/utils/headersWithUserToken';
import axios from 'axios';
import { CommunityNotFound } from '../../components/CommunityPageComponent/CommunityNotFound';
import { Alert, AlertIcon, Heading, useDisclosure } from '@chakra-ui/react';
import { CommunityPageHeader } from '../../components/CommunityPageComponent/CommunityPageHeader';
import { AllPagesLayout } from '../../components/Layout/AllPagesLayout';
import { AboutCommunityRHS } from '../../components/CommunityPageComponent/AboutCommunityRHS';
import { getHeadersWithProjectID } from '../../components/utils/projectID';
import useMenuButtonTextStore from '../../store/NavigatorStore/useMenuButtonTextStore';
import { CreatePostLink } from '../../components/CommunityPageComponent/CreatePostLink';
import { CommunityPosts } from '../../components/CommunityPageComponent/CommunityPosts';
import useSignUpModalStore from '../../store/ModalStore/SignUpModalStore';
import userLogInStore from '../../store/AuthenticationStore/userLogInStore';
import useThemeStore from '../../store/ThemeStore/useThemeStore';
import { AlertBox } from '../../components/CommunityPageComponent/AlertBox';
import { RedditGifLoader } from '../../components/LoadingComponents/RedditGifLoader';


export const CommunityPage = () => {

  const [communityData, setCommunityData] = useState(null);
  const [communityPosts, setCommunityPosts] = useState(null);
  const { channelId } = useParams();
  // console.log("channelId", channelId);
  const { menuButtonText, setMenuButtonText } = useMenuButtonTextStore();
  const { showSignUpModal, setSignUpModal } = useSignUpModalStore();
  const { isLoggedIn } = userLogInStore();

  const communityFollowed = JSON.parse(sessionStorage.getItem('communityFollowed'));

  const [followingCommunities, setFollowingCommunities] = useState(communityFollowed);

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const navigateTo = useNavigate();

  function removeSpace(str) {
    let removedSpacesText = str.split(" ").join("");
    return removedSpacesText
  }


  const getCommunity = async (channelId) => {
    const config = getHeadersWithProjectID();

    try {
      const response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/channel/${channelId}`, config);
      console.log("single community data", response.data.data);
      setCommunityData(response.data.data);

      const channelName = removeSpace(response.data.data.name);

      sessionStorage.setItem('menuButtonText', `r/${channelName}`);
      const updatedText = sessionStorage.getItem('menuButtonText');
      setMenuButtonText(updatedText);
    }
    catch (err) {
      console.log("error is fetching community");
      console.log(err);
      setCommunityData('Community not found');

    }
  }

  const getPostsOfCommunity = async () => {
    const config = getHeadersWithProjectID();
    try {
      const response = await axios.get('https://academics.newtonschool.co/api/v1/reddit/post?limit=1000', config);
      console.log("all posts fetched successfully", response.data.data);
      const allPosts = response.data.data;
      const channelPosts = allPosts.filter((post) => {
        if (post.channel) {
          return channelId === post.channel._id;
        }
      });
      console.log("posts of a community", channelPosts);
      setCommunityPosts(channelPosts);



    }
    catch (error) {
      console.log("error in fetching posts", error);
    }
  }

  useEffect(() => {
    //  getCommunity function is working fine geting response
    setTimeout(()=>{
      getCommunity(channelId);
      getPostsOfCommunity();

    }, 2000)



  }, [channelId]);

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
      getPostsOfCommunity();  //  after Upvoting, fetch post again to show the correct count
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
      getPostsOfCommunity();  //  after downVoting, fetch post again to show the correct count
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
      getPostsOfCommunity();   //  after deleting, fetch posts again to remove the deleted post
    }
    catch (error) {
      console.log('error in deleting post', error);
    }

  }

  function editPost(postDetails) {
    navigateTo('/editpost', { state: { postDetails, channelId } });

  }

  function handleComment(postDetails) {
    navigateTo(`/comment/${postDetails._id}`, { state: { postDetails } });
  }

  const {isDarkMode} = useThemeStore();

  const [isJoined, setIsJoined] = useState(false);





  return communityData ? communityData === 'Community not found' ? <CommunityNotFound /> :

    <>
      <CommunityPageHeader communityData={communityData} channelId={channelId} isJoined={isJoined} setIsJoined={setIsJoined} />
      <AllPagesLayout >
        {/* below fragment will go into all pages layout flex children[0] LHS */}
        <>
          {isAlertOpen && <AlertBox />}
          <CreatePostLink channelId={channelId} isAlertOpen={isAlertOpen} setIsAlertOpen={setIsAlertOpen} isJoined={isJoined} />
          <CommunityPosts
            communityPosts={communityPosts}
            increaseVote={increaseVote}
            decreaseVote={decreaseVote}
            channelId={channelId}
            deletePost={deletePost}
            editPost={editPost}
            handleComment={handleComment}
            isAlertOpen={isAlertOpen}
            setIsAlertOpen={setIsAlertOpen}
            isJoined={isJoined}
          />
          

        </>

        {/* below fragment will go into all pages layout flex children[1] RHS */}
        <>
          <AboutCommunityRHS communityData={communityData} communityPosts={communityPosts} isJoined={isJoined}/>
        </>
      </AllPagesLayout>
    </>
    :
    (<RedditGifLoader/>)


}
