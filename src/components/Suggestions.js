import { React, useEffect, useState } from 'react'
import { Flex, Input, IconButton, Text, useColorModeValue, InputGroup, Divider, Popover, PopoverCloseButton, PopoverBody, PopoverHeader, PopoverContent, Button, PopoverTrigger } from '@chakra-ui/react'
import SuggItems from './SuggItems'
import SearchResults from './SearchResults'
import { FaSearch } from 'react-icons/fa'
import useAxios from '../utils/useAxios'


function Suggestions() {

    let [users, setUsers] = useState([])
    let [query, setQuery] = useState([])

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


    let searchUsers = async () => {

        let searchUrl = '/users/userlist/?search='
        let searchvalue = document.getElementById('search').value
        let newUrl = searchUrl + searchvalue

        try {
            let response = await api.get(newUrl)
            console.log(response.data)
            setQuery(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Flex
            flexDir='column'
            mt={4}
            ml={4}
            bg={bg}
            right={4}
            position="fixed"
            height='100vh'
            width='50vh'
            float='right'
            overflowY='auto'
            overflowX='hidden'
        >
            <Flex>
                <InputGroup>
                    <Input variant='filled' placeholder='Search.. ' id="search" />
                </InputGroup>
                <Flex>

                    <Popover scrollBehavior='inside '
                    >
                        <PopoverTrigger>
                            <IconButton
                                aria-label='Search database'
                                id='searchbtn'
                                icon={<FaSearch />}
                                ml={1}
                                onClick={searchUsers}
                            />
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverCloseButton />
                            <PopoverHeader>Search Results</PopoverHeader>
                            <PopoverBody>
                                {query.map(item => (
                                    <SuggItems
                                        key={item.id}
                                        uid={item.id}
                                        username={item.username}

                                    >
                                    </SuggItems>
                                ))}</PopoverBody>
                        </PopoverContent>
                    </Popover>

                </Flex>
            </Flex>



            <Divider mt={1}></Divider>

            <Flex flexDir='column'>

                {users.map(user => (
                    <SuggItems
                        key={user.id}
                        uid={user.id}

                        username={user.username}
                        ifollow={user.ifollow}
                    >
                    </SuggItems>

                ))}

            </Flex>

        </Flex>
    )
}

export default Suggestions