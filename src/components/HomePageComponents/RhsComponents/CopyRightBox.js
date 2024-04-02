import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import useThemeStore from '../../../store/ThemeStore/useThemeStore'

export const CopyRightBox = () => {
    const {isDarkMode} = useThemeStore();
  return (
    <Box mt={2} padding={3} borderRadius="4px" bg={isDarkMode ? "#1a1a1b" : "white"} color={isDarkMode && "#d7dadc" } border="1px solid" borderColor={isDarkMode ? "#343536" : "gray.300"}>
        <Stack  fontSize="9pt">

          <Flex justify="space-between" >
            <Stack  width="100px" >
                <Text>User Agreement</Text>
                <Text>Privacy Policy</Text>
            </Stack>
            <Stack ml={3}  width="130px">
                <Text>Content Policy</Text>
                <Text>Moderator Code Of Conduct</Text>
            </Stack>
          </Flex>


          <Flex justify="space-between" mt={2}>
            <Stack  width="100px" >
                <Text>English</Text>
                <Text>Fran&#231;ais</Text>
                <Text>Italiano</Text>
            </Stack>
            <Stack ml={3} width="130px">
                <Text>Deutsch</Text>
                <Text>Espa&#241;ol</Text>
                <Text>Portugu&#234;s</Text>
            </Stack>
          </Flex>

          <Text mt={2}>Reddit, Inc. &copy; 2024. All rights reserved</Text>


        </Stack>
    </Box>
  )
}
