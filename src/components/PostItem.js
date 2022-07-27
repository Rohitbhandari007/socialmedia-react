import { React, useState } from 'react'
import { Box, Flex, Text, Image, Avatar, IconButton, Icon, Divider, useColorModeValue, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { FiMenu, FiHeart, FiMessageCircle, FiSave, FiShare } from 'react-icons/fi'


function PostItem({ details, postImage, created, username }) {

    const bg = useColorModeValue('#f0f0f5', '#1B222E')
    const borderColor = useColorModeValue('1px solid #f0f0f5', 'none')
    // const { image, setImage } = useState(false)


    return (
        <Box
            border={borderColor}
            borderRadius="lg"
            mt={4}
            bg={bg}
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        >
            <Flex
                flexDir='column'
            >

            </Flex>
            <Flex
                flexDir='row'
                justifyContent='space-between'
                m={2}
            >
                <Flex
                    flexDir='row'
                    justifyContent='space-around'
                >
                    <Text fontSize='sm' m={1} cursor='pointer' fontWeight='bold'>{username}</Text>
                    <Text fontSize='sm' m={1}>{created}</Text>
                </Flex>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<FiMenu />}
                        variant='outline'
                    />
                    <MenuList>
                        <MenuItem>
                            Report Post
                        </MenuItem>
                        <MenuItem>
                            Edit Post
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <Flex
                flexDir='column'
            >
                {postImage && <Image
                    src={postImage}
                    h='50vh' w='70vh'
                    objectFit='cover'
                    objectPosition='center center'
                    borderRadius='sm'></Image>
                }
                <Text m={2}>{details}</Text>
                <Divider></Divider>
                <Flex
                    flexDirection='row'
                    justifyContent='space-around'
                    mt={3}
                    mb={3}

                >

                    <Icon as={FiHeart} cursor="pointer"></Icon>
                    <Icon as={FiMessageCircle} cursor="pointer"></Icon>
                    <Icon as={FiSave} cursor="pointer"></Icon>
                    <Icon as={FiShare} cursor="pointer"></Icon>
                </Flex>
            </Flex>
        </Box >
    )
}

export default PostItem