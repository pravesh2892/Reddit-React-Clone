import { Alert, AlertIcon, Box, Button, Flex, Icon, Image, Text, useStatStyles } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaReddit } from 'react-icons/fa'
import userLogInStore from '../../store/AuthenticationStore/userLogInStore';
import useSignUpModalStore from '../../store/ModalStore/SignUpModalStore';
import useThemeStore from '../../store/ThemeStore/useThemeStore';
import { json } from 'react-router-dom';
import useUpdateDirectory from '../../store/DirectoryStore/useUpdateDirectory';

export const CommunityPageHeader = ({ communityData, channelId, isJoined, setIsJoined }) => {

  
  const { isLoggedIn } = userLogInStore();
  const { setSignUpModal } = useSignUpModalStore();

  const { updateDirectory, setUpdateDirectory } = useUpdateDirectory();

  const { isDarkMode } = useThemeStore();

  function removeSpace(str) {
    let removedSpacesText = str.split(" ").join("");
    return removedSpacesText
  }

  function handleJoinCommunityButton() {
    if (!isLoggedIn) {
      setSignUpModal(true);
      return;
    }

    setUpdateDirectory(!updateDirectory);


    if (isJoined) {
      // unfollowing removing id from session storage and join button false
      const communityFollowed = JSON.parse(sessionStorage.getItem('communityFollowed'));
      const updatefollowData = communityFollowed.filter((item) => item !== channelId);
      if (updatefollowData.length === 0) {
        sessionStorage.removeItem('communityFollowed');
        setIsJoined(false);
        return;
      }

      sessionStorage.setItem('communityFollowed', JSON.stringify(updatefollowData));

      setIsJoined(false);
    }
    else {

      // channel following conditions

      let updatefollowData = JSON.parse(sessionStorage.getItem('communityFollowed'));

      // if list is already present in session
      if (updatefollowData) {
        updatefollowData.push(channelId);
        sessionStorage.setItem('communityFollowed', JSON.stringify(updatefollowData));
      }
      else {
        // else create new list and this id
        let followChannel = [];
        followChannel.push(channelId);
        sessionStorage.setItem('communityFollowed', JSON.stringify(followChannel));
      }

      setIsJoined(true); // 'joined' true




    }
  }

  useEffect(() => {
    // on visiting this page if already followed then joined else join 
    console.log('use effect triggered')
    const communityFollowed = JSON.parse(sessionStorage.getItem('communityFollowed'));

    // if communityfollowd is not null than check the channel id is there in followed list 
    if (communityFollowed) {
      let isFollowed = communityFollowed.find((item) => item === channelId);
      if (isFollowed) {
        setIsJoined(true); // if channel id found in followed list than 'joined' true
      } else {
        setIsJoined(false);
      }
    }

  }, [channelId])

  return (
    <Flex direction="column" width="100%">
     
      {isDarkMode ? <Box height="80px" bg="brand.100" /> :
        <Image src='/images/bannerBackgroundImage.jpg' height="180px" objectFit="cover" borderTop="2px solid" borderTopColor="gray.200" />}
      <Flex justify="center" bg={isDarkMode ? "#1a1a1b" : "white"} flexFlow={1} height="70px">
        <Flex width="95%" maxWidth="860px" >
          {
            communityData.image ? (<Image src={communityData.image}
              height={20}
              width={20}
              position="relative"
              top={-4}
              border={isDarkMode ? "4px solid #1a1a1b" : "4px solid white"}
              borderRadius="50%"
            />
            ) : (<Icon as={FaReddit}
              fontSize={64}
              position="relative"
              top={-4}
              bg="white"
              color="brand.100"
              border="4px solid"
              borderColor={isDarkMode ? "#1a1a1b" : "white"}
              borderRadius="50%"
            />
            )}

          <Flex padding="10px 15px">
            <Flex direction="column" mr={6}>
              <Text
                fontWeight={800}
                fontSize="16pt"
                color={isDarkMode && "#d7dadc"}
              >
                {removeSpace(communityData.name)}
              </Text>

              <Text
                fontWeight={600}
                fontSize="10pt"
                color="gray.400"
              >
                r/{removeSpace(communityData.name)}
              </Text>
            </Flex>

            <Button
              variant={isLoggedIn ? isJoined ? "outline" : "solid" : 'solid'}
              height="30px"
              pr={6}
              pl={6}
              onClick={handleJoinCommunityButton}

            >
              {isLoggedIn ? isJoined ? 'Joined' : 'Join' : 'Join'}
            </Button>
            
          </Flex>
        

        </Flex>
       
      </Flex>


    </Flex>
  )
}
