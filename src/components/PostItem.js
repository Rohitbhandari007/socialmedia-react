import { React, useState, useEffect, useContext } from 'react'
import {
    Box, Flex, Text, Image, Avatar, IconButton, Icon, Divider, useColorModeValue, Menu, MenuButton, MenuItem, MenuList, Tooltip, Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import { FiMenu, FiHeart, FiMessageCircle, FiSave, FiShare } from 'react-icons/fi'
import useAxios from '../utils/useAxios'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'


function PostItem({ title, details, postImage, created, username, likes, postId, likedBy, iliked, uid, profile_image }) {

    const bg = useColorModeValue('#f0f0f5', '#1B222E')
    const borderColor = useColorModeValue('1px solid #f0f0f5', 'none')
    const datetextColor = useColorModeValue('#2f3249', 'whiteAlpha.400')
    const titletextColor = useColorModeValue('#23262e', 'whiteAlpha.800')
    const detailtextColor = useColorModeValue('#2f3249', 'whiteAlpha.700')


    const { isOpen, onOpen, onClose } = useDisclosure()
    let [likebtn, setlikebtn] = useState(iliked)
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
            setlikebtn(response.data.liked)
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
                    <Avatar size='sm'
                        src={'http://127.0.0.1:8000' + profile_image}
                    >
                    </Avatar>
                    <Link to={"/user/" + username + "/" + uid} >
                        <Text fontSize='sm' m={1} cursor='pointer' fontWeight='bold'>{username}</Text>
                    </Link>
                </Flex>

                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<FiMenu />}
                        variant='ghost'
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
                    src={'http://127.0.0.1:8000' + postImage}
                    h='50vh' w={{ sm: '50vh', md: '80vh' }}
                    objectFit='cover'
                    objectPosition='center center'
                >

                </Image>
                }
                <Text fontSize='xs' ml={2} color={datetextColor}>{created}</Text>
                <Text ml={2} fontSize="sm" color={titletextColor}>{title}
                </Text>
                <Text ml={2} fontSize="xs" color={detailtextColor}>{details}
                </Text>
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
                            variant='ghost'
                            type='submit'
                            onClick={likePostNew}
                            color={likebtn ? 'red.400' : 'white'}
                            _hover={{

                                color: "red.400",
                            }}
                        >
                        </IconButton>
                        <Tooltip >
                            <Text ml={1} fontSize='xs' cursor='pointer' onClick={onOpen}>
                                {count} Likes
                            </Text>
                        </Tooltip>
                        <Modal isOpen={isOpen} onClose={onClose} size='xs'>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalCloseButton alignSelf='center' />
                                <ModalBody>
                                    {likedBy.map(liked => (
                                        <div
                                            key={liked.id}
                                        >{liked.username}</div>
                                    ))}
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </Flex>
                    <IconButton
                        _hover={{
                            color: "whiteAlpha.500",
                        }}
                        icon={<FiMessageCircle />}
                        cursor="pointer"
                        variant='ghost'>
                    </IconButton>
                    <IconButton
                        _hover={{
                            color: "whiteAlpha.500",
                        }} icon={<FiSave />}
                        cursor="pointer"
                        variant='ghost'>
                    </IconButton>
                    <IconButton
                        _hover={{
                            color: "whiteAlpha.500",
                        }} icon={<FiShare />}
                        cursor="pointer"
                        variant='ghost'></IconButton>
                </Flex>
            </Flex>
        </Box >
    )
}

export default PostItem