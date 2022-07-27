import React from 'react'
import { Flex, Input, IconButton, Text, useColorModeValue, InputGroup } from '@chakra-ui/react'
import SuggItems from './SuggItems'
import { FaSearch } from 'react-icons/fa'

function Suggestions() {
    const bg = useColorModeValue('none', 'none')

    return (
        <Flex
            flexDir='column'
            m={1}
            mt={4}
            ml={4}
            bg={bg}

            position="fixed"
            height='100vh'
            float='right'
        >
            <Flex>
                <InputGroup>
                    <Input variant='filled' placeholder='Search.. ' />
                    <IconButton
                        aria-label='Search database'
                        icon={<FaSearch />}
                        ml={1}
                    />

                </InputGroup>

            </Flex>
            <Flex flexDir='column'>
                <Text m={3}>Suggestions</Text>
                <SuggItems></SuggItems>
                <SuggItems></SuggItems>
                <SuggItems></SuggItems>

            </Flex>

        </Flex>
    )
}

export default Suggestions