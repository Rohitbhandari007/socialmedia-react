import React from 'react'
import { Flex, Input, IconButton, Text, useColorModeValue } from '@chakra-ui/react'
import SuggItems from './SuggItems'

function Suggestions() {
    //const borderColor = useColorModeValue('1px solid #fff', '1px solid #111224')
    const bg = useColorModeValue('none', 'none')

    return (
        <Flex
            flexDir='column'
            m={1}
            mt={4}
            bg={bg}

            position="fixed"
            height='100vh'
            float='right'
        >

            <Text m={3}>Suggestions</Text>
            <SuggItems></SuggItems>
            <SuggItems></SuggItems>
            <SuggItems></SuggItems>

        </Flex>
    )
}

export default Suggestions