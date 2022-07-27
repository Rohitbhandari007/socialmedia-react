import { React, useContext, useRef, useState, useEffect } from 'react'
import { FiPower, FiHome, FiUser, FiUmbrella, FiSettings, FiBookmark, FiMessageCircle } from 'react-icons/fi'
import { HiDotsVertical } from 'react-icons/hi'
import NavItem from './NavItem'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'


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
            setUser(data.username)
        }
    }



    return (
        <Flex
            pos="fixed"
            height="100vh"
            flexDir="column"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            w="40vh"
            justifyContent="space-between"
            bg={bg}
            p={4}
            left={0}
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
                >
                    <ColorModeSwitcher
                        background="none"
                    >
                    </ColorModeSwitcher>

                </Flex>

                <NavItem icon={FiHome} title={"Home"} ></NavItem>
                <NavItem icon={FiUser} title={"Profile"} ></NavItem>
                <NavItem icon={FiUmbrella} title={"Notifications"} ></NavItem>
                <NavItem icon={FiMessageCircle} title={"Messages"} ></NavItem>
                <NavItem icon={FiBookmark} title={"Saved Posts"} ></NavItem>
                <NavItem icon={FiSettings} title={"Settings"} ></NavItem>

            </Flex>
            <Flex
                flexDir='row'
                alignItems='center'
                p={2}
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                bg={bgBottom}
            >
                <Flex alignItems='center'>
                    <Avatar size='md' border='2px solid gray'>
                    </Avatar>
                    <Text ml={2}>{user}</Text>
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

        </Flex >
    )
}

export default Nav