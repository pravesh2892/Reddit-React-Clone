import React, { useEffect, useState } from 'react'
import { AllPagesLayout } from '../../components/Layout/AllPagesLayout'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import { SearchTabItem } from '../../components/SearchPageComponents/SearchTabItem'
import { PostTab } from '../../components/SearchPageComponents/PostTab/PostTab'
import { CommunityTab } from '../../components/SearchPageComponents/CommunityTab/CommunityTab'
import { useLocation } from 'react-router-dom'
import { getHeadersWithProjectID } from '../../components/utils/projectID'
import axios, { all } from 'axios'
import useMenuButtonTextStore from '../../store/NavigatorStore/useMenuButtonTextStore'
import userLogInStore from '../../store/AuthenticationStore/userLogInStore.js'


const searchTabs = [
    {
       title: "Posts"
    },
    {
        title: "Communities"  
    } 
]

export const SearchPage = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    console.log("search query", query); 

    const {setMenuButtonText} = useMenuButtonTextStore();

    const {isLoggedIn} = userLogInStore();


    const [selectedTab, setSelectedTab] = useState(searchTabs[0].title);

    const [posts, setPosts] = useState(null);
    const [communities, setCommunities] = useState(null);
    const [users, setUsers] = useState(null);




    function removeSpace(str) {
        let removedSpacesText = str.split(" ").join("");
        return removedSpacesText
      }
    


    async function searchPosts(){
        const config = getHeadersWithProjectID();
        try{
            const response = await axios.get('https://academics.newtonschool.co/api/v1/reddit/post?limit=1000', config);
            console.log('all posts in search page', response.data.data);
            const allPost = response.data.data;

            const filteredPostData = allPost.filter((item)=>{
                const author = item.author.name.toLowerCase();
                const content = item.content.toLowerCase();
                let title;
                if(item.title){
                  title = item.title.toLowerCase();
                }

                const q = query.toLowerCase();

                if(author.includes(q) || content.includes(q)){
                    return item;
                }
                
                if(title){
                    if(title.includes(q)){
                        return item;
                    }
                }

            })

            console.log("filtered Post", filteredPostData);
            setPosts(filteredPostData);



        }
        catch(error){
            console.log("error in fetching posts", error)
        }
    }

    async function searchCommunity(){
        const config = getHeadersWithProjectID();
        try{
            const response = await axios.get('https://academics.newtonschool.co/api/v1/reddit/channel?limit=1000', config);
            console.log('channels fetched in search page', response.data.data);
            const allCommunity = response.data.data;

            const filteredCommunity = allCommunity.filter((item)=>{
                const channelName = removeSpace(item.name.toLowerCase());

                const q = query.toLowerCase();
                if(channelName.includes(q)){
                    return item;
                }
            })

            console.log("filter community", filteredCommunity);
            setCommunities(filteredCommunity);

        }
        catch(error){
            console.log("error in fetching channels in search page", error)
        }
    }
    
    
    useEffect(()=>{
        setMenuButtonText('Search Result');
        sessionStorage.setItem('menuButtonText', 'Search Result');
        searchPosts();
        searchCommunity();
    }, [query])


    return (
        <AllPagesLayout>
            {/* LHS */}
            <>
                <Flex direction="column" mt={2} >

                    <Flex width="100%">
                       {searchTabs.map((item, index)=>(
                        <SearchTabItem key={index} item={item} isSelected={item.title === selectedTab} setSelectedTab={setSelectedTab} />
                       ))} 
                    </Flex>

                   {selectedTab === "Posts" && <PostTab query={query} posts={posts}/>}

                   {selectedTab === "Communities" && <CommunityTab query={query} communities={communities}/>}

 
                   

                </Flex>
               

            </>


            {/* RHS */}
            <>
                {/* <Heading>RHS</Heading> */}
            </>
        </AllPagesLayout>
    )
}
