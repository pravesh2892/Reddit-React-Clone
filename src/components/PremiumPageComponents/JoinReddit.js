import { Box, Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import useThemeStore from '../../store/ThemeStore/useThemeStore'

export const JoinReddit = () => {

    const { isDarkMode } = useThemeStore();

    return (
        <Flex align="center" justify="center" bg={isDarkMode ? "#1a1a1b" : "white"} color={isDarkMode && "#d7dadc"}>

            <Stack pt={8} pb={8} align="center" justify="center">
                <Heading textAlign="center" mb={4}>Join Reddit Premium Today</Heading>

                <Flex>

                    <Box height="134px" width="180px" bg={isDarkMode ? "#272729" : "gray.100"} borderRadius="20px" p={2} fontSize="9pt" textAlign="center" mr={4}>
                        <Flex align="center" justify="center" mb={2}>
                            <Image src='/images/premium-ad-free.png' height="48px" width="48px" />
                        </Flex>

                        <Text fontWeight={700} >Ad-free Browsing</Text>
                        <Text color="gray.500">Enjoy redditing without interruption from ads</Text>
                    </Box>
                    <Box height="134px" width="180px" bg={isDarkMode ? "#272729" : "gray.100"} borderRadius="20px" p={2} fontSize="9pt" textAlign="center" mr={4}>
                        <Flex align="center" justify="center" mb={2}>
                            <Image src='/images/premium-avatars.png' height="48px" width="48px" />
                        </Flex>

                        <Text fontWeight={700} >Exclusive Avatar Gear</Text>
                        <Text color="gray.500">Outfit your avatar with the best gear and accessories</Text>
                    </Box>
                    <Box height="134px" width="180px" bg={isDarkMode ? "#272729" : "gray.100"} borderRadius="20px" p={2} fontSize="9pt" textAlign="center" mr={4}>
                        <Flex align="center" justify="center" mb={2}>
                            <Image src='/images/premium-lounge.png' height="48px" width="48px" />
                        </Flex>

                        <Text fontWeight={700} >Members Lounge</Text>
                        <Text color="gray.500">Discover all the illuminati secrets in r/lounge</Text>
                    </Box>
                    <Box height="134px" width="180px" bg={isDarkMode ? "#272729" : "gray.100"} borderRadius="20px" p={2} fontSize="9pt" textAlign="center">
                        <Flex align="center" justify="center" mb={2}>
                            <Image src='/images/premium-app-icons.png' height="48px" width="48px" />
                        </Flex>

                        <Text fontWeight={700} >Custom App Icons*</Text>
                        <Text color="gray.500">Change your app icon to something more your style</Text>
                    </Box>

                </Flex>

                <Flex width="530px" align="center" justify="space-between" mt={4}>
                    <Button variant="outline" height="40px" width="49%" _hover={{ bg: "#144a58" }}>$5.99/Month</Button>
                    <Button height="40px" width="49%">$49.99/Year <Text ml={1} bg="white" p={1} borderRadius="20px" color="brand.100">Save 30%</Text></Button>
                </Flex>

                <Text fontSize="9pt" mt={1} color="gray.500">Subscriptions automatically renew</Text>
                <Text fontSize="9pt" color="gray.500">*Custom app icons are only available through a paid Reddit Premium subscriptions</Text>
                <Text fontWeight={700} mt="30px">Visit the Reddit Premium FAQs</Text>
            </Stack>

        </Flex>
    )
}
