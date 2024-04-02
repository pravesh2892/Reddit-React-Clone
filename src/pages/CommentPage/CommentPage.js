import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AllPagesLayout } from '../../components/Layout/AllPagesLayout';
import { Heading, useStatStyles } from '@chakra-ui/react';
import { PostItem } from '../../components/HomePageComponents/PostItem';
import { getHeadersWithUserToken } from '../../components/utils/headersWithUserToken';
import axios from 'axios';
import userLogInStore from '../../store/AuthenticationStore/userLogInStore';
import useSignUpModalStore from '../../store/ModalStore/SignUpModalStore';
import { getHeadersWithProjectID } from '../../components/utils/projectID';
import { Comment, Comments } from '../../components/CommentPageComponents/Comments';
import useMenuButtonTextStore from '../../store/NavigatorStore/useMenuButtonTextStore';

export const CommentPage = () => {

  const { postId } = useParams();


  console.log('post id', postId);


  const [currentPostDetails, setCurrentPostDetails] = useState(null);

  const [commentText, setCommentText] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);

  const [allComments, setAllComments] = useState(null);

  const { isLoggedIn } = userLogInStore();
  const { setSignUpModal } = useSignUpModalStore();

  const navigateTo = useNavigate();

  const {setMenuButtonText} = useMenuButtonTextStore();
  
  useEffect(()=>{
    setMenuButtonText('Post');
    sessionStorage.setItem('menuButtonText', 'Post');
  }, [])


  // FETCH ALL POSTS
  const fetchAllPosts = async () => {
    const config = getHeadersWithProjectID();
    try {
      const response = await axios.get('https://academics.newtonschool.co/api/v1/reddit/post?limit=1000', config);
      console.log("posts", response.data.data);
      const allPosts = response.data.data;
      // console.log('all posts', allPosts)
      const selectedPostDetails = allPosts.find((item) => item._id === postId); // return selected postDetails
      console.log("selected post details", selectedPostDetails)
      setCurrentPostDetails(selectedPostDetails);


    }
    catch (error) {
      console.log('error');
    }
  }

  

  async function getCommentsOfPost(){
    const config = getHeadersWithProjectID();
    try{
      const response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/post/${postId}/comments/`, config);
      console.log('comments fetched successfully', response.data.data);
      const comments = response.data.data;
      comments.reverse()
      setAllComments(response.data.data);

    }
    catch(error){
       console.log('error in fetching comment', error);
    }
  }

  useEffect(() => {
    fetchAllPosts();
    getCommentsOfPost();

  }, [])

  // UP VOTE FUNCTION
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
      fetchAllPosts();  //  after Upvoting, fetch post again to show the correct count
    }
    catch (error) {
      console.log('fail to upvote', error.response);
    }
  }

  // DOWN VOTE FUNCTION
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
      fetchAllPosts();  //  after downVoting, fetch post again to show the correct count
    }
    catch (error) {
      console.log('fail to downVote', error.response);
    }
  }

  //  DELETE POST FUNCTION
  async function deletePost(postId) {

    const config = getHeadersWithUserToken();

    try {
      const response = await axios.delete(`https://academics.newtonschool.co/api/v1/reddit/post/${postId}`, config);
      console.log("post deleted successfully", response);
      navigateTo('/');

    }
    catch (error) {
      console.log('error in deleting post', error);
    }

  }

  // EDIT POST FUNCTION
  function editPost(postDetails) {
    navigateTo('/editPost', { state: { postDetails, postId } });

  }

  // FUNCTION HANDLE COMMENT 
  function handleCommentIcon() {
    return;
  }

  // CREATE COMMENT FUNCTION
  async function createComment(comment){
    const config = getHeadersWithUserToken();
    try{

      const response = await axios.post(`https://academics.newtonschool.co/api/v1/reddit/comment/${postId}`, comment, config);
      console.log('comment created successfully', response);
      setCommentText('');
      setBtnLoading(false);
      fetchAllPosts();
      getCommentsOfPost();
    }
    catch(error){
      console.log("error in creating comment", error)
    }


}

// HANDLE COMMENT BUTTON CLICK
function handleCommentClick(){
  setBtnLoading(true);
  const comment = {
     content: commentText
  }

  createComment(comment);
}

// DELETE COMMENT
async function deleteComment(commentId){
  const config = getHeadersWithUserToken();
  try{
      const response = await axios.delete(`https://academics.newtonschool.co/api/v1/reddit/comment/${commentId}`, config);
      console.log('comment deleted successfully', response.data);
      getCommentsOfPost();
  }
  catch(error){
    console.log("error in deleting comment", error);
  }
}



  return (
    <AllPagesLayout>
      <>
        {currentPostDetails &&
          <>
            <PostItem
              post={currentPostDetails}
              decreaseVote={decreaseVote}
              increaseVote={increaseVote}
              deletePost={deletePost}
              editPost={editPost}
              handleComment={handleCommentIcon}
            />
            <Comments postId={postId} 
            commentText={commentText} 
            setCommentText={setCommentText} 
            btnLoading={btnLoading} 
            handleCommentClick={handleCommentClick}
            allComments={allComments}
            deleteComment={deleteComment}
            
            />

          </>
          }

       </>


      <>
        {/* <Heading>RHS</Heading> */}
      </>
    </AllPagesLayout>
  )
}

