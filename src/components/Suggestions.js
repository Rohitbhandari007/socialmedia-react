import { React, useEffect, useState } from 'react'
import {
    Flex, Input, IconButton, Text, useColorModeValue, InputGroup,
    Avatar, Button
} from '@chakra-ui/react'
import SuggItems from './SuggItems'
import { FaSearch } from 'react-icons/fa'
import useAxios from '../utils/useAxios'


function Suggestions() {

    let [users, setUsers] = useState([])

    const bg = useColorModeValue('none', 'none')
    const btnbgColor = useColorModeValue('#e4e5eb', '#1A202C')
    const btntextColor = useColorModeValue('#000', '#fff')

    let api = useAxios()

    useEffect(() => {
        getUsers()
    }, [])


    let getUsers = async () => {
        let response = await api.get('/users/suggestions/')
        console.log(response.data)
        setUsers(response.data)

        // if (response.status === 200) {
        //     setUsers(response.data)
        //     console.log(users)
        // }
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
            right={0}
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
                        key={user.id}
                    >
                        <Flex
                            flexDir='row'
                            l={0}
                            alignItems='center'
                            w="25vh"
                        >
                            <Avatar size='sm'>

                            </Avatar>

                            <Text ml={1} _hover={{ textDecoration: "underline", color: "whtie" }}>{user.username}</Text>
                        </Flex>

                        <Button
                            bg={btnbgColor}
                            color={btntextColor}
                            _hover={{ backgroundColor: "#000", color: '#fff' }}

                        >Follow</Button>
                    </Flex >
                ))}
            </Flex>

        </Flex>
    )
}

export default Suggestions