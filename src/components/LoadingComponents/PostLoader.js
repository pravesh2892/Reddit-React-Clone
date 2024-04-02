import { Box, Skeleton, SkeletonText, Stack } from '@chakra-ui/react'
import React from 'react'
import useThemeStore from '../../store/ThemeStore/useThemeStore'

export const PostLoader = () => {

  const {isDarkMode} = useThemeStore();
  return (
    <Stack spacing={6}>
        <Box padding="10px 10px" boxShadow="lg" bg={isDarkMode ? "#1a1a1b" :"white"} borderRadius={4}>
          <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" bg={isDarkMode && "#272729"} />
          <SkeletonText mt="4" noOfLines={4} spacing="4" bg={isDarkMode && "#272729"}/>
          <Skeleton mt="4" height="200px" bg={isDarkMode && "#272729"}/>

        </Box>
        
        <Box padding="10px 10px" boxShadow="lg" bg={isDarkMode ? "#1a1a1b" :"white"} borderRadius={4}>
          <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" bg={isDarkMode && "#272729"}/>
          <SkeletonText mt="4" noOfLines={4} spacing="4" bg={isDarkMode && "#272729"}/>
          <Skeleton mt="4" height="200px" bg={isDarkMode && "#272729"}/>

        </Box>

    </Stack>
  )
}
