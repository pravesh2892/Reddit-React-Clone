import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Divider,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from '@chakra-ui/react'
import {BsFillEyeFill, BsFillPersonFill} from "react-icons/bs";
import {HiLockClosed} from "react-icons/hi";
import { getHeadersWithProjectID } from '../../utils/projectID';
import axios from 'axios';
import { getHeadersWithUserToken } from '../../utils/headersWithUserToken';
import { useNavigate } from 'react-router-dom';
import useMenuButtonTextStore from '../../../store/NavigatorStore/useMenuButtonTextStore';
import useUpdateDirectory from '../../../store/DirectoryStore/useUpdateDirectory';
import useThemeStore from '../../../store/ThemeStore/useThemeStore';

export const CreateCommunityModal = ({showCommunityModal, handleClose}) => {

  const {menuButtonText, setMenuButtonText} = useMenuButtonTextStore();
  
  const [communityName, setCommunityName] = useState('');
  const [charRemaining, setCharRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [errorMessage, setErrorMessage] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);
  const {setUpdateDirectory} = useUpdateDirectory();
  const {isDarkMode} = useThemeStore();

  const navigateTo = useNavigate();

  function handleInputChange(e){

   if(errorMessage) setErrorMessage('');

    if(e.target.value.length > 21) return;

    setCommunityName(e.target.value);
    setCharRemaining(21 - e.target.value.length)

  }

  function handleCommunityTypeSelection(e){
      
      setCommunityType(e.target.name);
  }


  const createGroup = async (groupName)=>{
        const config = getHeadersWithUserToken();

        const formData = new FormData();
        formData.append('name', groupName);

       

        try{
          const response = await axios.post('https://academics.newtonschool.co/api/v1/reddit/channel/', formData, config);
          console.log("create comm response", response.data);
          navigateTo(`/community/${response.data.data._id}`);
          sessionStorage.setItem('menuButtonText', `r/${response.data.data.name}`);
          handleClose();
          setBtnLoading(false);
          setUpdateDirectory((oldState)=>{
            return !oldState
          })
          
        }
        catch(error){
          setBtnLoading(false);
          console.log("create comm error", error);
          try {
            //  IF GOT ERROR FROM API
              setErrorMessage(error.response.data.message + ". Try different name");
          } catch (err) {
              
              setErrorMessage('Network Error');
          }
        }
  }



  function handleCreateCommunity(){
    // Validate Community
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\?~]/;
    if(format.test(communityName) || communityName.length < 3){
       setErrorMessage(
        "Community name must be between 3-21 characters, and can only contain letters, numbers and underscore."
       );
       return;
    }

    // After validating create community
    setBtnLoading(true);
    createGroup(communityName);
      

  }



  return (
    <>
      

      <Modal isOpen={showCommunityModal} onClose={handleClose} size="lg" >
        <ModalOverlay />
        <ModalContent bg={isDarkMode ? "#1a1a1b" : "white"} color={isDarkMode && "#d7dadc"} border="1px solid" borderColor={isDarkMode ? "#343536" : "gray.300"}>
          <ModalHeader
             display='flex'
             flexDirection="column"
             fontSize={20}
             padding={3}
          >Create a Community</ModalHeader>

          <Box pl={3} pr={3}>
           <Divider/>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            flexDirection="column"
            padding="10px 0px"
            
          >
            <Text fontWeight={600} fontSize={15}>
              Name
            </Text>
            <Text fontSize={11} color="gray.500">
              Community names including capitalization cannot be changed
            </Text>

            <Text 
            position="relative" 
            top="28px" 
            left="10px" 
            width="20px"
            color="gray.500"
            >
              r/
            </Text>

            <Input
              position="relative"
              value={communityName}
              size="sm"
              pl="22px"
              onChange={handleInputChange}
            />
            <Text fontSize="9pt"
             color={charRemaining === 0 ? 'red' : "gray.500"}
            >
            {charRemaining} Characters remaining
            </Text>

            {errorMessage && <Text color='red' fontSize='10pt'>{errorMessage}</Text>}

            <Box mt={4} mb={4}>
              <Text fontWeight={600} fontSize={15}>
                Community Type
              </Text>

              {/* Checkbox for community type (public, restricted, private) */}
              <Stack spacing={2} mt={2}>
                <Checkbox name='public' 
                isChecked={communityType === "public"}
                onChange={handleCommunityTypeSelection}
                >
                  <Flex align="center">
                    <Icon as={BsFillPersonFill} color="gray.500" mr={2}/>
                    <Text fontSize="10pt" mr={1}>Public</Text> 
                    <Text fontSize="8pt" color="gray.500" pt={1}>
                     Anyone can view, post, and comment to this community.
                    </Text> 
                  </Flex>
                </Checkbox>

                <Checkbox name='restricted' 
                isChecked={communityType === "restricted"}
                onChange={handleCommunityTypeSelection}
                >
                   <Flex align="center">
                   <Icon as={BsFillEyeFill} color="gray.500" mr={2}/>
                    <Text fontSize="10pt" mr={1}>Restricted</Text> 
                    <Text fontSize="8pt" color="gray.500" pt={1}>
                    Anyone can view this community, but only approved users can post.
                    </Text> 
                  </Flex>
                </Checkbox>

                <Checkbox name='private' 
                isChecked={communityType === "private"}
                onChange={handleCommunityTypeSelection}
                >
                   <Flex align="center">
                   <Icon as={HiLockClosed} color="gray.500" mr={2}/>
                    <Text fontSize="10pt" mr={1}>Private</Text> 
                    <Text fontSize="8pt" color="gray.500" pt={1}>
                     Only approved user can view and submit to this community.
                    </Text> 
                  </Flex>
                </Checkbox>
              </Stack>
            </Box>

          </ModalBody>
        
          </Box>



          <ModalFooter bg={isDarkMode ? "#101113" : "gray.100"} borderRadius="0px 0px 10px 10px"  >
            <Button 
            variant="outline"
            height="30px"
            mr={3}
            onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant='solid'
             height="31px"
             onClick={handleCreateCommunity}
             isLoading={btnLoading}
            >
              Create Community
              </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
