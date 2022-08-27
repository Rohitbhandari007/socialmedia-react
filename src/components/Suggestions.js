import { React, useEffect, useState, useRef } from 'react'
import { Flex, Input, IconButton, useDisclosure, useColorModeValue, InputGroup, Divider, Popover, PopoverCloseButton, PopoverBody, PopoverHeader, PopoverContent, Button, PopoverTrigger, Drawer, DrawerBody, DrawerCloseButton, DrawerOverlay, DrawerContent, DrawerHeader } from '@chakra-ui/react'
import SuggItems from './SuggItems'
import SearchResults from './SearchResults'
import { FaSearch } from 'react-icons/fa'
import useAxios from '../utils/useAxios'


function Suggestions() {

    let [users, setUsers] = useState([])
    let [query, setQuery] = useState([])
    let [searchValue, setSearchValue] = useState(null)
    let [searchTerm, setSearchTerm] = useState('')

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()



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
        let searchvalue = searchTerm
        console.log(searchTerm)



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
                <Flex>
                    <>
                        <IconButton icon={<FaSearch />} ref={btnRef} onClick={onOpen}>
                        </IconButton>
                        <Drawer
                            isOpen={isOpen}
                            placement='right'
                            onClose={onClose}
                            finalFocusRef={btnRef}
                        >
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton />
                                <DrawerHeader>Search Results</DrawerHeader>

                                <DrawerBody>
                                    <Input variant='filled'
                                        placeholder='Search Users.. '
                                        id="search" name='searchfield'
                                        onChange={(event) => { setSearchTerm(event.target.value); searchUsers() }} />

                                    <Flex flexDir='column'>

                                        {searchTerm.length === 0
                                            ?
                                            <>Type something to search</>
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


                                    </Flex>
                                </DrawerBody>

                            </DrawerContent>
                        </Drawer>
                    </>
                </Flex>
            </Flex>






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