import React from 'react'
import { Flex } from '@chakra-ui/react'
import { PostSearchItem } from './PostSearchItem'

export const PostTab = ({query, posts}) => {


  return (
    <Flex direction="column" mt="30px" borderRadius="4px" overflow="hidden">

      {/* ITEM COMPONENT */}

      {posts ? posts.length > 0 ? posts.map((post, index)=>(
            <PostSearchItem key={index} post={post}/>
      )): <div>No posts found</div> : <div>Loading...</div> }
      
     

    </Flex>
  )
}
