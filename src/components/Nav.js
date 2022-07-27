import React from 'react'
import { Flex, Text, Avatar, useColorModeValue, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { FiPower, FiHome, FiUser, FiUmbrella, FiSettings, FiBookmark, FiMessageCircle } from 'react-icons/fi'
import { HiDotsVertical } from 'react-icons/hi'
import NavItem from './NavItem'
import { ColorModeSwitcher } from '../ColorModeSwitcher'


function Nav() {

    const bg = useColorModeValue('#f0f1f5', 'none')
    const bgBottom = useColorModeValue('#f0f0f5', '#1B222E')



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
                    <Text ml={2}>Username</Text>
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
                        <MenuItem>
                            Logout
                        </MenuItem>
                        <MenuItem>
                            Help
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>

        </Flex >
    )
}

export default Nav