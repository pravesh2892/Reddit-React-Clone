import { Box, Button, Flex, Image, Stack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { PremiumLandingImage } from '../../components/PremiumPageComponents/PremiumLandingImage'
import { JoinReddit } from '../../components/PremiumPageComponents/JoinReddit'
import { PremiumFooter } from '../../components/PremiumPageComponents/PremiumFooter'
import useMenuButtonTextStore from '../../store/NavigatorStore/useMenuButtonTextStore'

export const RedditPremium = () => {

  const {setMenuButtonText} = useMenuButtonTextStore();

   useEffect(()=>{
    setMenuButtonText('Premium');
    sessionStorage.setItem('menuButtonText', 'Premium');
   }, [])

  return (
     <>
      <PremiumLandingImage/>  
      <JoinReddit/>
      <PremiumFooter/>
    </>
  )
}
