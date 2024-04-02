import React, { useEffect } from 'react'
import { AllPagesLayout } from '../../components/Layout/AllPagesLayout'
import { Box, Text, chakra } from '@chakra-ui/react'
import { EditPostForm } from '../../components/EditPostPageComponents/EditPostForm'
import { useLocation } from 'react-router-dom'
import useMenuButtonTextStore from '../../store/NavigatorStore/useMenuButtonTextStore'
import useThemeStore from '../../store/ThemeStore/useThemeStore'
import { SubmitPostRhs } from '../../components/SubmitPostPageComponents/SubmitPostRhs'

export const EditPostPage = () => {
    const location = useLocation();
    // location.state.channelId
    // location.state.postDetails

    const {isDarkMode} = useThemeStore();

    const {setMenuButtonText} = useMenuButtonTextStore();
  
  useEffect(()=>{
    setMenuButtonText('Edit Post');
    sessionStorage.setItem('menuButtonText', 'Edit Post');
  }, [])
    
    return (
        <AllPagesLayout>
            {/* LHS */}
            <>
                <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
                    <Text fontSize="30px" fontWeight={600} color={isDarkMode && "#d7dadc"}>Edit a Post</Text>
                </Box>
                <EditPostForm  postDetails={location.state.postDetails} channelId={location.state.channelId} postId={location.state.postId} />
            </>

            {/* RHS */}
            <>
              <SubmitPostRhs/>
            </>
        </AllPagesLayout>
    )
}
