import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import useSignUpModalStore from '../../../store/ModalStore/SignUpModalStore'
import { SignUpInput } from './SignUpInput'

export const SignUpModal = () => {

    const {showSignUpModal, setSignUpModal} = useSignUpModalStore();
   
    return (
      <>
        <Modal isOpen={showSignUpModal} onClose={()=>{setSignUpModal(false)}}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign='center'>Sign Up</ModalHeader>
            <ModalCloseButton />
            <ModalBody 
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            pb={6}
            >
             <Flex 
             direction='column'
             align='center'
             justify='center'
             width='70%'
             >
                <SignUpInput/>

             </Flex>
            </ModalBody>


          </ModalContent>
        </Modal>
      </>
    )
}
