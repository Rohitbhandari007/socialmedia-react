import { React, useEffect, useState } from 'react'
import { Flex, Input, IconButton, Text, useColorModeValue, InputGroup, Divider, Popover, PopoverCloseButton, PopoverBody, PopoverHeader, PopoverContent, Button, PopoverTrigger } from '@chakra-ui/react'
import SuggItems from './SuggItems'
import SearchResults from './SearchResults'
import { FaSearch } from 'react-icons/fa'
import useAxios from '../utils/useAxios'


function Suggestions() {

    let [users, setUsers] = useState([])
    let [query, setQuery] = useState([])
    let [searchValue, setSearchValue] = useState(null)


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



    let searchUsers = async (event) => {

        let searchUrl = '/users/userlist/?search='
        let searchvalue = document.getElementById('search').value





        setSearchValue(searchvalue)
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
            pos={{ md: "fixed" }}
            display={['none', 'flex']}

        >
            <Flex>
                <InputGroup>
                    <Input variant='filled' placeholder='Search.. ' id="search" name='searchfield' />
                </InputGroup>
                <Flex
                >

                    <Popover>
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

                                {query.length === 0
                                    ?
                                    <>No Results found for "{searchValue}"</>
                                    :
                                    <>
                                        {query.map(item => (
                                            <SearchResults
                                                key={item.id}
                                                uid={item.id}
                                                username={item.username}
                                                profile_image={item.profile_image}

                                                searchValue={searchValue}
                                            >
                                            </SearchResults>
                                        ))}
                                    </>

                                }


                            </PopoverBody>
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
                        profile_image={user.profile_image}
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