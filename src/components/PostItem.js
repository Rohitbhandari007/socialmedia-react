import { React, useState, useEffect, useContext } from 'react'
import { Box, Flex, Text, Image, Avatar, IconButton, Icon, Divider, useColorModeValue, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { FiMenu, FiHeart, FiMessageCircle, FiSave, FiShare } from 'react-icons/fi'
import useAxios from '../utils/useAxios'
import AuthContext from '../context/AuthContext'


function PostItem({ title, details, postImage, created, username, likes, postId }) {

    const bg = useColorModeValue('#f0f0f5', '#1B222E')
    const borderColor = useColorModeValue('1px solid #f0f0f5', 'none')

    const [likeBtnColor, setLikeBtnColor] = useState('whtie')


    let [count, setCount] = useState(likes)

    let api = useAxios()
    let url = '/like-unlike/'
    const pk = {
        pk: postId
    }


    let likePostNew = async () => {

        try {
            let response = await api.post(url, pk)
            setCount(response.data.count)
        } catch (error) {
            console.log(error)
        }

    }


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
                    <Avatar size='sm'></Avatar>
                    <Text fontSize='sm' m={1} cursor='pointer' fontWeight='bold'>{username}</Text>
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
                    alignSelf='center'
                    src={postImage}
                    h='50vh' w={{ sm: '50vh', md: '80vh' }}
                    objectFit='cover'
                    objectPosition='center center'
                >

                </Image>
                }
                <Text fontSize='sm' ml={2}>{created}</Text>
                <Text ml={2}>{title}</Text>
                <Text m={2}>{details}</Text>
                <Divider></Divider>
                <Flex
                    flexDirection='row'
                    justifyContent='space-around'
                    mt={3}
                    mb={3}

                >

                    <Flex alignItems='center'>
                        <IconButton
                            icon={<FiHeart />}
                            cursor="pointer"
                            variant='outline'
                            type='submit'
                            onClick={likePostNew}
                        >
                        </IconButton>

                        <Text ml={1} fontSize='xs'>
                            {count} Likes

                        </Text>
                    </Flex>

                    <Icon as={FiMessageCircle} cursor="pointer"></Icon>
                    <Icon as={FiSave} cursor="pointer"></Icon>
                    <Icon as={FiShare} cursor="pointer"></Icon>
                </Flex>
            </Flex>
        </Box >
    )
}

export default PostItem