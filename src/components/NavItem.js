import React from 'react'
import { Flex, Icon, Text, Menu, MenuButton, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


function NavItem({ icon, title, linkto }) {


    return (
        <Flex
            flexDirection='column'
            w="100%"
            mt={2}
        >
            <Menu placement='right'>
                <Link
                    to={linkto}
                >
                    <Button w='100%' display='flex' flexDir='row' justifyContent='space-between' variant='ghost'>
                        <Text ml={2}>{title}</Text>
                        <Icon as={icon} fontSize="xl"></Icon>



                    </Button>
                </Link>

            </Menu>

        </Flex >
    )
}

export default NavItem