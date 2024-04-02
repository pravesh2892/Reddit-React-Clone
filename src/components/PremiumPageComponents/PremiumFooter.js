import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { BsBox2 } from 'react-icons/bs'

export const PremiumFooter = () => {
    return (
        <Box bg="#0c3744" padding="48px 20px 32px 20px">
            <Stack width="100%" align="center">

                <Flex width="100%" justify="center" align="center" mb={6} gap={6} fontSize="14px">

                    <Flex color="#fff" width="170px" height="132px" justify="center">
                        <Flex direction="column" width="max-content" justify="space-evenly" fontWeight={500}>
                            <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>About</Text>
                            <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>Careers</Text>
                            <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>Press</Text>
                        </Flex>
                    </Flex>

                    <Flex color="#fff" width="170px" height="132px" justify="center" borderRight="1px solid #ffffff80">
                        <Flex direction="column" width="max-content"  justify="space-evenly" fontWeight={500}>
                            <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>Advertise</Text>
                            <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>Blog</Text>
                            <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>Help</Text>
                        </Flex>
                    </Flex>

                    <Flex  color="#fff" width="170px" height="132px" justify="center">
                        <Flex direction="column" width="max-content" fontWeight={500}>
                            <Text cursor="pointer" _hover={{ textDecoration: "underline" }} mt={3}>Reddit Premium</Text>

                        </Flex>
                    </Flex>

                    <Flex color="#fff" width="170px" height="132px" justify="center" borderLeft="1px solid #ffffff80">
                        <Flex direction="column" width="max-content" justify="space-evenly" fontWeight={500}>
                            <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>Facebook</Text>
                            <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>Twitter</Text>
                            <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>Instagram</Text>
                        </Flex>
                    </Flex>

                </Flex>

               <Flex fontSize="14px" color="#ffffff80">
                   <Text textDecoration="underline" mr={4}>Content Policy</Text>
                   <Text textDecoration="underline" mr={4}>Privacy Policy</Text>
                   <Text textDecoration="underline" mr={4}>User Agreement</Text>
                   <Text textDecoration="underline" mr={4}>Mod Policy</Text>
                   <Text>Reddit, Inc. &copy; 2024. All rights reserved.</Text>
               </Flex>
            </Stack>
        </Box>
    )
}
