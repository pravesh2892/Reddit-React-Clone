import { Box, Button, Flex, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export const PremiumLandingImage = () => {
  return (
    <Box backgroundImage={`linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 50%), url(/images/premiumHero.jpg)` } 
    bgSize="contain" 
    bgRepeat="no-repeat" 
    bgPosition="center" 
    height="544px"
    >
      <Stack paddingTop="100px" pl="113px" >
        <Image src='/images/reddit_premium_landing.png' width="558px" height="85px"/>
         <Text fontWeight={700} color="white" width="560px" fontSize="14pt" mb="20px">Help support Reddit and get VIP treatment and exclusive access.</Text>

         <Flex  width="530px" align="center" justify="space-between">
         <Button variant="outline" borderColor="white" color="white" height="40px" width="49%" _hover={{bg: "#144a58"}}>$5.99/Month</Button>
         <Button height="40px" width="49%">$49.99/Year <Text ml={1} bg="white" p={1} borderRadius="20px" color="brand.100">Save 30%</Text></Button>
         </Flex>

         <Text mt={1} fontSize="9pt" color="#FFFFFF">Subscriptions automatically renew</Text>
        </Stack>
</Box>      
  )
}
