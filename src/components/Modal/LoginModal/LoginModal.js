import { Button, Center, Flex, useDisclosure } from '@chakra-ui/react'
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
import useLogInModalStore from '../../../store/ModalStore/LogInModalStore'
import { LoginInputs } from './LoginInputs'

export const LoginModal = () => {

    const {showLogInModal, setLogInModal} = useLogInModalStore();
    return (
      <>
        <Modal isOpen={showLogInModal} onClose={()=>setLogInModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign='center'>Login</ModalHeader>
            <ModalCloseButton/>
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
                <LoginInputs/>

             </Flex>
            </ModalBody>

          </ModalContent>
        </Modal>
      </>
    )
  }

