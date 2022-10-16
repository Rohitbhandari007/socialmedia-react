import { React, useContext, useRef, useState, useEffect } from 'react'
import { FiPower, FiHome, FiUser, FiMessageCircle, FiSearch } from 'react-icons/fi'
import { HiDotsVertical } from 'react-icons/hi'
import NavItem from './NavItem'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'
import CreatePost from './CreatePost'
import { Link } from 'react-router-dom'


//chakra ui imports
import {
    Flex, Text, Avatar, useColorModeValue,
    IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure,
    Alert, Button, AlertDialog, AlertDialogOverlay, AlertDialogHeader,
    AlertDialogContent, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter
} from '@chakra-ui/react'


function Nav() {
    let [user, setUser] = useState([])


    const bg = useColorModeValue('#f0f1f5', 'none')
    const bgmob = useColorModeValue('#f0f1f5', '#262a33')

    const bgBottom = useColorModeValue('#f0f0f5', '#1B222E')

    let { logoutUser } = useContext(AuthContext)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()


    //api calls

    let api = useAxios()

    useEffect(() => {
        getUser()
    }, [])


    let getUser = async () => {
        let response = await api.get('/users/profile/')

        if (response.status === 200) {
            const data = response.data
            setUser(data)
        }
    }




    return (
        <Flex>

            <Flex
                bottom={0}
                pos='fixed'
                bg={bgmob}
                w='100vw'
                display={['flex', 'flex', , 'flex', 'none']}
                zIndex={1}

            >
                <Flex w="100%" h="100%" justifyContent='space-around' alignItems='center'>

                    <Link to='/'>
                        <IconButton icon={<FiHome />} variant='ghost'></IconButton>
                    </Link>
                    <IconButton icon={<FiMessageCircle />} variant='ghost'></IconButton>
                    <IconButton icon={<FiSearch />} variant='ghost'></IconButton>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<Avatar size="xs" src={'http://127.0.0.1:8000' + user.profile_image} />}
                            variant='ghost'
                            ml='6vh'
                        />
                        <MenuList>
                            <MenuItem onClick={logoutUser}>
                                Logout
                            </MenuItem>
                            <Link to='/profile'>
                                <MenuItem>
                                    My Profile
                                </MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>

                </Flex>

            </Flex>


            <Flex
                pos='fixed'
                height="100vh"
                flexDir="column"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                w='40vh'
                justifyContent="space-between"
                bg={bg}
                p={4}
                left={0}
                display={['none', 'none', 'none', 'flex']}
            >

                <Flex
                    p="5%"
                    flexDir="column"
                    w="100%"
                    as="nav"
                    alignItems="start"

                >

                    <Flex
                        justifyContent='space-between'
                        w="100%"
                        alignItems='center'

                    >
                        <ColorModeSwitcher
                            background="none"
                        >
                        </ColorModeSwitcher>

                    </Flex>
                    <NavItem icon={FiHome} title={"Home"} linkTo="/"></NavItem>
                    <NavItem icon={FiUser} title={"Profile"} linkTo='/profile'></NavItem>

                </Flex>
                <Flex
                    flexDir='column'
                >
                    <CreatePost></CreatePost>
                    <Flex
                        flexDir='row'
                        alignItems='center'
                        p={2}
                        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                        justifyContent='space-between'
                        bg={bgBottom}
                    >

                        <Flex alignItems='center'>
                            <Avatar size='md' border='2px solid gray'
                                src={'http://127.0.0.1:8000' + user.profile_image}
                            >
                            </Avatar>
                            <Text ml={2}>{user.username}</Text>
                        </Flex>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<HiDotsVertical />}
                                variant='ghost'
                                ml='6vh'
                            />
                            <MenuList>
                                <MenuItem onClick={onOpen}>
                                    Logout
                                </MenuItem>

                                <MenuItem>
                                    Help
                                </MenuItem>
                            </MenuList>
                        </Menu>
                        <AlertDialog
                            motionPreset='slideInBottom'
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                            isOpen={isOpen}
                            isCentered
                        >
                            <AlertDialogOverlay />

                            <AlertDialogContent>
                                <AlertDialogHeader>Logout</AlertDialogHeader>
                                <AlertDialogCloseButton />
                                <AlertDialogBody>
                                    Are you sure you want to Logout?
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                        No
                                    </Button>
                                    <Button colorScheme='red' ml={3} onClick={logoutUser}>
                                        Yes
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Flex>

                </Flex>

            </Flex >
        </Flex >
    )
}

export default Nav