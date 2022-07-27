import React from 'react'
import { Flex, Avatar, Button, Text, useColorModeValue } from '@chakra-ui/react'

function SuggItems() {
    const bg = useColorModeValue('#fff', '#1B222E')
    const btnbgColor = useColorModeValue('#e4e5eb', '#1A202C')
    const btntextColor = useColorModeValue('#000', '#fff')

    return (
        <Flex
            m={2}
            flexDir='row'
            borderRadius='lg'
            justifyContent='space-around'
            height='10vh'
            alignItems='center'
            p={5}
            cursor='pointer'
            bg={bg}
        >
            <Flex
                flexDir='row'
                l={0}
                alignItems='center'
                w="25vh"
            >
                <Avatar size='sm'>

                </Avatar>

                <Text ml={1} _hover={{ textDecoration: "underline", color: "whtie" }}>akai</Text>
            </Flex>

            <Button
                bg={btnbgColor}
                color={btntextColor}
                _hover={{ backgroundColor: "#000", color: '#fff' }}

            >Follow</Button>
        </Flex >
    )
}

export default SuggItems