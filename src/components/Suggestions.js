import { React, useEffect, useState } from 'react'
import { Flex, Input, IconButton, Text, useColorModeValue, InputGroup, Divider } from '@chakra-ui/react'
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

    let searchUrl = '/users/userlist/?search='


    let searchUsers = async () => {

        let searchvalue = document.getElementById('search').value
        console.log(searchvalue)
        let newUrl = searchUrl + searchvalue


        try {
            console.log(searchvalue)
            let response = await api.get(newUrl)
            setQuery(response.data)
            console.log(query)
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
            right={1}
            position="fixed"
            height='100vh'
            width='50vh'
            float='right'
        >
            <Flex>
                <InputGroup>
                    <Input variant='filled' placeholder='Search.. ' id="search" />
                    <IconButton
                        aria-label='Search database'
                        icon={<FaSearch />}
                        ml={1}
                        onClick={searchUsers}
                    />

                </InputGroup>

            </Flex>
            {/* {searchedUsers.map(item => (
                <SearchResults
                    key={item.id}
                    searchItem={item.username}>

                </SearchResults>
            ))} */}
            <Divider mt={1}></Divider>

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