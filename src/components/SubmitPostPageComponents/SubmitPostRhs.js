import { Box, Flex, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import useThemeStore from '../../store/ThemeStore/useThemeStore'
import { color } from 'framer-motion';

export const SubmitPostRhs = () => {

  const {isDarkMode} = useThemeStore();

  return (
    <>

    <Box bg={isDarkMode ? "#1a1a1b" : "white"} 
         color={isDarkMode && "#d7dadc"} 
         borderRadius="4px" 
         border="1px solid" 
         borderColor={isDarkMode ? "#343536" : "gray.300" }
         mt="40px"
         p="16px 8px 8px 8px"
         >

      <Stack>
            <Flex align="center">
               <Image src='/images/postingReddit.svg' height="40px" width="45px" mr={2}/>
               <Text fontSize="17px" fontWeight={700}>Posting to Reddit</Text>
            </Flex>

            <Text borderWidth="1px 0px 1px 0px" borderColor={isDarkMode ? "#343536" : "gray.300" } fontSize="10pt" fontWeight={700} padding="8px 4px" >1. Rememeber the human</Text>
            <Text borderBottom="1px solid" borderColor={isDarkMode ? "#343536" : "gray.300" } fontSize="10pt" fontWeight={700} padding="8px 4px" >2. Behave like you would in real life</Text>
            <Text borderBottom="1px solid" borderColor={isDarkMode ? "#343536" : "gray.300" } fontSize="10pt" fontWeight={700} padding="8px 4px" >3. Look for original source of content</Text>
            <Text borderBottom="1px solid" borderColor={isDarkMode ? "#343536" : "gray.300" } fontSize="10pt" fontWeight={700} padding="8px 4px" >4. Search duplicates before posting</Text>
            <Text borderBottom="1px solid" borderColor={isDarkMode ? "#343536" : "gray.300" } fontSize="10pt" fontWeight={700} padding="8px 4px" >5. Read the community's rules</Text>
      </Stack>
    </Box>
     
    <Text width="274px" 
          fontSize="9pt"
          color={isDarkMode && "#d7dadc"}
          mt={4}
          fontWeight={600}

    >
      Please be mindful of reddit's <span style={{color: isDarkMode ? "aqua" : "blue"}}>content policy</span> and practice good <span style={{color: isDarkMode ? "aqua" : "blue"}}>redditquette.</span>
      </Text>
  
    </>

  )
}
