import { Image } from '@chakra-ui/react'
import React from 'react'

export const RedditGifLoader = () => {
  return (
   <Image src='/images/redditLoading.gif' objectFit={{base: "cover", md: "contain"}} width="100vw" height="100vh"/>
  )
}
