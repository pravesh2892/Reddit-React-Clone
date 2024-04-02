import { Stack } from '@chakra-ui/react';
import React from 'react';
import { RedditPrimiumBox } from './RhsComponents/RedditPrimiumBox.js';
import { RedditHomeBox } from './RhsComponents/RedditHomeBox.js';
import { CopyRightBox } from './RhsComponents/CopyRightBox.js';
import { CommunityRecommendation } from './CommunityRecommendation.js';



export const LoggedInHomeRhs = () => {
  return (
    <Stack>
      
     <RedditPrimiumBox/>

     <RedditHomeBox/>

     <CommunityRecommendation/>

     <CopyRightBox/>

    </Stack>
  )
}
