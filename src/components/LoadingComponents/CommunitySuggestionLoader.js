import { Box, Skeleton, SkeletonText, Stack } from '@chakra-ui/react'
import React from 'react'

export const CommunitySuggestionLoader = () => {
  return (
    <Stack padding="5px 8px">
        
          <SkeletonText mt="4" noOfLines={1} spacing="4"/>
          <SkeletonText mt="4" noOfLines={1} spacing="4"/>
          <SkeletonText mt="4" noOfLines={1} spacing="4"/>
          <SkeletonText mt="4" noOfLines={1} spacing="4"/>
          <SkeletonText mt="4" mb="4" noOfLines={1} spacing="4"/>


    </Stack>
  )
}
