import React, { useEffect } from 'react'
import { AllPagesLayout } from '../../components/Layout/AllPagesLayout'
import { Box, Text } from '@chakra-ui/react'
import { NewPostForm } from '../../components/SubmitPostPageComponents/NewPostForm'
import { useLocation } from 'react-router-dom'
import useMenuButtonTextStore from '../../store/NavigatorStore/useMenuButtonTextStore'
import useThemeStore from '../../store/ThemeStore/useThemeStore'
import { SubmitPostRhs } from '../../components/SubmitPostPageComponents/SubmitPostRhs'

export const SubmitPostPage = () => {
  const location = useLocation();
  console.log("current data", location.state);
  // const channelId = location.state.channelId;

  const {setMenuButtonText} = useMenuButtonTextStore();
  const {isDarkMode} = useThemeStore();
  
  useEffect(()=>{
    setMenuButtonText('Create Post');
    sessionStorage.setItem('menuButtonText', 'Create Post');
  }, [])

  
  return (
   <AllPagesLayout>

     {/* LHS */}
     <>
      <Box p="14px 0px" borderBottom="1px solid" borderColor={isDarkMode ? "#343536" : "white"} color={isDarkMode && "#d7dadc"}>
        <Text fontSize="30px" fontWeight={600}>Create a Post</Text>
      </Box>
      <NewPostForm channelId={location.state.channelId && location.state.channelId}/>
     </>

     {/* RHS */}
     <>
      <SubmitPostRhs/>
     </>

   </AllPagesLayout>
  )
}
