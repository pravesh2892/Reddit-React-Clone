import React, { useEffect, useState } from 'react'
import { AllPagesLayout } from '../../components/Layout/AllPagesLayout'
import { UserDetails } from '../../components/ProfilePageComponents/UserDetails'
import { UserPosts } from '../../components/ProfilePageComponents/UserPosts'
import { getHeadersWithProjectID } from '../../components/utils/projectID'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getHeadersWithUserToken } from '../../components/utils/headersWithUserToken'
import { CommunityNotFound } from '../../components/CommunityPageComponent/CommunityNotFound'
import { Heading } from '@chakra-ui/react'
import useMenuButtonTextStore from '../../store/NavigatorStore/useMenuButtonTextStore'


export const ProfilePage = () => {

  const {userId} = useParams();

  const [userPosts, setUserPosts] = useState(null);
  const [userDetails, setUserDetails] = useState(false);

  const loggedInUserDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails'));

  const fetchPosts = async () => {

    const config = getHeadersWithProjectID();
    try {
      const response = await axios.get('https://academics.newtonschool.co/api/v1/reddit/post?limit=1000', config);
      // console.log("Home page posts", response.data.data);
      let allPosts = response.data.data;

      const userCreatedPosts = allPosts.filter((item) => item.author._id === userId);
      console.log("user posts", userCreatedPosts);

      setUserPosts(userCreatedPosts);



    }
    catch (error) {
      console.log('error');
      
    }
  }

  async function fetchUserDetails(){
    const config = getHeadersWithUserToken();
    try{
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/user/${userId}`, config);
        console.log('user Details', response.data.data);
        setUserDetails(response.data.data)
        
    }
    catch(error){
      console.log("error fetching user Details", error);
      setUserDetails('User Not Found');
    }
}

const {setMenuButtonText} = useMenuButtonTextStore();

  useEffect(()=>{
        fetchPosts();
        fetchUserDetails();
        setMenuButtonText('Profile');
        sessionStorage.setItem('menuButtonText', 'Profile');
  }, [userId])

  return ( userDetails ? userDetails === 'User Not Found' ? <CommunityNotFound/> :
    <AllPagesLayout>
     
      {/* LHS */}
         <>
          <UserPosts userPosts={userPosts} setUserPosts={setUserPosts} fetchPosts={fetchPosts}/>
         </>

      {/* RHS */}
        <>
         <UserDetails userId={userId} userDetails={userDetails} setUserDetails={setUserDetails}/>
        </>

    </AllPagesLayout>
    : 
    <Heading>Loading...</Heading>
  )
}
