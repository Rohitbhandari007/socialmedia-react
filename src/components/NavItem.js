import React from 'react'
import { Flex, Icon, Text, Menu, Link, MenuButton } from '@chakra-ui/react'

function NavItem({ icon, title }) {


    return (
        <Flex
            flexDirection='column'
            w="100%"
            mt={2}
        >
            <Menu placement='right'>
                <Link
                    p={3}
                    borderRadius={8}
                    _hover={{ backgroundColor: "grey", color: "#000" }}

                    width="100%"

                >
                    <MenuButton w="100%">
                        <Flex flexDirection="row">
                            <Icon as={icon} fontSize="xl"></Icon>
                            <Text ml={5}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>

        </Flex >
    )
}

export default NavItem