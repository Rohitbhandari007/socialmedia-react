import { React, useState, useRef, useContext } from 'react'
import {
    Box, Flex, Text, Image, Avatar, IconButton, Icon, Divider, useColorModeValue, Menu, MenuButton, MenuItem, MenuList, Tooltip, Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    ModalHeader,
    ModalFooter,
    Input,
    AlertDialog,
    AlertDialogBody,
    AlertDialogOverlay,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    VisuallyHidden,
} from '@chakra-ui/react'
import { FiMenu, FiHeart, FiMessageCircle, FiSave, FiShare } from 'react-icons/fi'
import { BiComment } from 'react-icons/all'
import useAxios from '../utils/useAxios'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'



function PostItem({ title, details, postImage, created, username, likes, postId, likedBy, iliked, uid, profile_image, comment_count }) {

    const bg = useColorModeValue('#f0f0f5', '#1B222E')
    const borderColor = useColorModeValue('1px solid #f0f0f5', 'none')
    const datetextColor = useColorModeValue('#2f3249', 'whiteAlpha.400')
    const titletextColor = useColorModeValue('#23262e', 'whiteAlpha.800')
    const detailtextColor = useColorModeValue('#2f3249', 'whiteAlpha.700')

    const cancelRef = useRef()

    let { user } = useContext(AuthContext)


    //chakra ui button functions
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const { isOpen: isLikeOpen, onOpen: onLikeOpen, onClose: onLikeClose } = useDisclosure()


    //api call button funcions
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

    let editPost = async (e) => {
        let urlnew = '/posts/' + postId + '/'
        e.preventDefault();

        let form_data = new FormData();
        form_data.append('image', e.target.image.files[0]);
        form_data.append('title', e.target.title.value);
        form_data.append('details', e.target.details.value);

        try {
            let response = await api.put(urlnew, form_data)
            console.log(response)
            console.log(form_data)

        } catch (error) {
            console.log(error)
        }
    }
    let deletePost = async () => {
        let urlnew = '/posts/' + postId + '/'
        try {
            let response = await api.delete(urlnew)
            console.log(response)
            window.location.reload();
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

                {user.user_id === uid ?


                    <Menu >
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<FiMenu />}
                            variant='ghost'
                        />
                        <MenuList>
                            <MenuItem onClick={onDeleteOpen}>
                                Delete Post

                                <AlertDialog
                                    motionPreset='slideInBottom'
                                    leastDestructiveRef={cancelRef}
                                    onClose={onDeleteClose}
                                    isOpen={isDeleteOpen}
                                    isCentered
                                >
                                    <AlertDialogOverlay />

                                    <AlertDialogContent>
                                        <AlertDialogHeader>Delete</AlertDialogHeader>
                                        <AlertDialogCloseButton />
                                        <AlertDialogBody>
                                            Are you sure you want to Delete this post?
                                        </AlertDialogBody>
                                        <AlertDialogFooter>
                                            <Button ref={cancelRef} onClick={onDeleteClose}>
                                                No
                                            </Button>
                                            <Button colorScheme='red' ml={3} onClick={deletePost}>
                                                Yes
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </MenuItem>
                            <MenuItem onClick={onOpen}>
                                Edit Post
                                <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <form onSubmit={editPost}>
                                        <ModalContent>
                                            <ModalHeader >Edit Post</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Flex
                                                    flexDir='column'
                                                    justifyContent='space-between'
                                                >
                                                    <Input id="title" placeholder='Title' mb={2} name='title' isRequired></Input>
                                                    <Input id="details" placeholder='Details (Optional)' mb={2} name='details'></Input>
                                                    <input id="image" name='image' type='file' accept="image/*"></input>
                                                </Flex>


                                            </ModalBody>

                                            <ModalFooter>
                                                <Button colorScheme='red' mr={3} onClick={onClose}>
                                                    Close
                                                </Button>
                                                <Button colorScheme='blue' type='submit'>Post</Button>

                                            </ModalFooter>
                                        </ModalContent>
                                    </form>
                                </Modal>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    :
                    <VisuallyHidden>edit</VisuallyHidden>

                }

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
                            <Text ml={1} fontSize='xs' cursor='pointer' onClick={onLikeOpen}>
                                {count} Likes
                            </Text>
                        </Tooltip>
                        <Modal isOpen={isLikeOpen} onClose={onLikeClose} size='xs'>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalCloseButton alignSelf='center' />
                                <ModalBody>
                                    {/* {likedBy.map(liked => (
                                        <div
                                            key={liked.id}
                                        >{liked.username}</div>
                                    ))} */}
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </Flex>
                    <Link to={'/posts/' + username + '/' + postId + '/'}>
                        <Flex flexDir='row' alignItems='center' justifyContent='center'>

                            <IconButton
                                _hover={{
                                    color: "whiteAlpha.500",
                                }}
                                icon={<BiComment />}
                                cursor="pointer"
                                variant='ghost'>
                            </IconButton>
                            <Text ml={1} fontSize='xs' cursor='pointer' textAlign='center'>{comment_count} Comments</Text>

                        </Flex>

                    </Link>
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