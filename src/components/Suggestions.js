import { React, useEffect, useState } from 'react'
import { Flex, Input, IconButton, Text, useColorModeValue, InputGroup } from '@chakra-ui/react'
import SuggItems from './SuggItems'
import { FaSearch } from 'react-icons/fa'
import useAxios from '../utils/useAxios'


function Suggestions() {

    let [users, setUsers] = useState([])

    const bg = useColorModeValue('none', 'none')


    let api = useAxios()

    useEffect(() => {
        getUsers()
    }, [])


    let getUsers = async () => {

        try {
            let response = await api.get('/users/suggestions/')
            setUsers(response.data)


        } catch (error) {
            console.log(error)
        }

    }


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

                {users.map(user => (
                    <SuggItems
                        key={user.id}
                        username={user.username}
                    >
                    </SuggItems>

                ))}

            </Flex>

        </Flex>
    )
}

export default Suggestions