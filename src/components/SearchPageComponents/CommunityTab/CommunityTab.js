import React from 'react'
import { Flex } from '@chakra-ui/react'
import { CommunitySearchItem } from './CommunitySearchItem'

export const CommunityTab = ({query, communities}) => {
  return (
    <Flex direction="column" mt="30px" borderRadius="4px" overflow="hidden">

      {communities ? communities.length > 0 ? 
          communities.map((community, index)=>(

            <CommunitySearchItem key={index} community={community}/>
          ))
      : <div>No community found</div> : <div>Loading...</div>}

  </Flex>
  )
}
