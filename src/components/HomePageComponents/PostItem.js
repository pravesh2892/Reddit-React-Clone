import { Flex, Icon, Image, Stack, Text, chakra } from '@chakra-ui/react'
import React from 'react'
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline, IoArrowUpCircleSharp, IoArrowRedoOutline, IoBookmarkOutline } from 'react-icons/io5'
import { BsChat } from 'react-icons/bs';
import { FaReddit, FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import userLogInStore from '../../store/AuthenticationStore/userLogInStore';
import useSignUpModalStore from '../../store/ModalStore/SignUpModalStore';
import { getHeadersWithUserToken } from '../utils/headersWithUserToken';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../store/ThemeStore/useThemeStore';

export const PostItem = ({ post, increaseVote, decreaseVote, deletePost, editPost, handleComment }) => {

  const token = sessionStorage.getItem('userToken');
  const { isLoggedIn, setIsLoggedIn } = userLogInStore();
  const { setSignUpModal } = useSignUpModalStore();
  const { isDarkMode } = useThemeStore();
  const loggedInUserDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails'));
  const navigateTo = useNavigate();

  function removeSpace(str) {
    let removedSpacesText = str.split(" ").join("");
    return removedSpacesText
  }

  function redirectToProfile(userId) {
    if(!isLoggedIn){
      setSignUpModal(true);
      return;
    }
    navigateTo(`/profile/${userId}`);
  }


  return (
    <Flex
      border='1px solid'
      bg={isDarkMode ? "#1a1a1b" : "white"}
      borderColor={isDarkMode ? "#343536" : 'gray.300'}
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}


    >
      {/* VOTING BUTTON COLUMN */}
      <Flex
        direction="column"
        align="center"
        bg={isDarkMode ? "#101113" : "gray.100"}
        p={2}
        width="40px"
        borderRadius={4}
      >


        <Icon as={IoArrowUpCircleOutline}
          color="gray.400"
          fontSize={24}
          cursor="pointer"
          _hover={{ color: "brand.100" }}
          onClick={() => increaseVote(post._id)}
        />
        <Text fontSize="9pt" fontWeight={600} color={isDarkMode && "#d7dadc"}>{post.likeCount}</Text>
        <Icon as={IoArrowDownCircleOutline}
          color="gray.400"
          cursor="pointer"
          _hover={{ color: "brand.100" }}
          fontSize={24}
          onClick={() => decreaseVote(post._id)}
        />

      </Flex>

      {/* POSTS COLUMN */}
      <Flex direction="column" width="100%">
        <Stack spacing={1} p="10px">
          <Stack
            direction="row"
            spacing={0.6}
            align="center"
            fontSize="9pt"
            flexWrap="wrap"
          >
            {post.channel ? post.channel.image ? <Image src={post.channel.image}
              height={6}
              width={6}
              borderRadius='50%'
              objectFit='cover'
              mr={1}
            />
              :
              <Icon as={FaReddit} fontSize={20} mr={1} borderRadius="20px" color="brand.100" bg={isDarkMode && "white"} /> : <Icon as={FaReddit} fontSize={20} mr={1} color="brand.100" borderRadius="20px" bg={isDarkMode && "white"} />}

            {post.channel &&
              <Text
                mr={1}
                cursor="pointer"
                color={isDarkMode && "#d7dadc"}
                _hover={{ color: "blue.500" }}
                fontWeight={700}
                onClick={() => navigateTo(`/community/${post.channel._id}`)}
              >r/{removeSpace(post.channel.name)}</Text>}

            <Text color="gray.500">
              Posted by <chakra.span cursor="pointer"
               _hover={{ textDecoration: "underline", color: "gray.600" }}
                onClick={() => redirectToProfile(post.author._id)}
              >
                u/{post.author.name}
              </chakra.span>
            </Text>

          </Stack>

          {/* TITLE AND CONTENT */}
          {post.title && <Text fontSize="14pt" fontWeight={600} color={isDarkMode && "#d7dadc"} >{post.title} </Text>}
          {post.content && <Text fontSize="10pt" color={isDarkMode && "#d7dadc"}>{post.content}</Text>}

          {/* POSTING IMAGE */}
          <Flex justify="center" align="center" p={2}>
            {post.images.length > 0 && <Image height="300px" maxWidth='100%' objectFit="cover"
              src={post.images[0]}
              alt='Post-Image'
            />}
          </Flex>
        </Stack>

        {/* COMMENT SHARE SAVE BUTTON */}
        <Flex ml={1} mb={0.5} color={isDarkMode ? "#818384" : "gray.500"} >

          <Flex
            align="center"
            padding="8px 10px"
            borderRadius={4}
            _hover={{ bg: isDarkMode ? "#343536" : "gray.200" }}
            cursor="pointer"
            onClick={() => handleComment(post)}
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{post.commentCount}</Text>
          </Flex>

          <Flex
            align="center"
            padding="8px 10px"
            borderRadius={4}
            _hover={{ bg: isDarkMode ? "#343536" : "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt" display={{base: 'none', md: 'block'}}>Share</Text>
          </Flex>

          <Flex
            align="center"
            padding="8px 10px"
            borderRadius={4}
            _hover={{ bg: isDarkMode ? "#343536" : "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt" display={{base: 'none', md: 'block'}}>Save</Text>
          </Flex>

          {isLoggedIn && post.author._id === loggedInUserDetails._id && (
            <Flex
              align="center"
              padding="8px 10px"
              borderRadius={4}
              _hover={{ bg: isDarkMode ? "#343536" : "gray.200" }}
              cursor="pointer"
              onClick={() => editPost(post)}
            >
              <Icon as={FaRegEdit} mr={2} />
              <Text fontSize="9pt" display={{base: 'none', md: 'block'}}>Edit</Text>
            </Flex>
          )}

          {/* Delete icon User created channel can delete any of his channel post if */}
          {isLoggedIn && (
            (post.author._id === loggedInUserDetails._id) ||
            (post.channel && post.channel.owner === loggedInUserDetails._id)
          ) && (
              <Flex
                align="center"
                padding="8px 10px"
                borderRadius={4}
                _hover={{ bg: isDarkMode ? "#343536" : "gray.200" }}
                cursor="pointer"
                onClick={() => deletePost(post._id)}
              >
                <Icon as={MdDeleteOutline} mr={2} />
                <Text fontSize="9pt" display={{base: 'none', md: 'block'}}>Delete</Text>
              </Flex>

            )}

        </Flex>



      </Flex>
    </Flex>
  )
}
