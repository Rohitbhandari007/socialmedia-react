import { React, useContext } from 'react'

import {
    Button, Modal, ModalBody, ModalContent, ModalHeader, Text, ModalFooter, ModalOverlay, useDisclosure, ModalCloseButton, Input,
    Flex, Link
} from '@chakra-ui/react'
import AuthContext from '../context/AuthContext'




function CreatePost() {
    let { createPost } = useContext(AuthContext)


    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button mt={2} variant='outline' onClick={onOpen}>Create Post</Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={createPost}>
                    <ModalContent>
                        <ModalHeader>Create Post</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex
                                flexDir='column'
                                justifyContent='space-between'
                            >
                                <Input placeholder='Title' mb={2} name='title' isRequired></Input>
                                <Input placeholder='Details (Optional)' mb={2} name='details'></Input>
                                <input name='image' type='file' accept="image/*"></input>
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
        </>
    )
}

export default CreatePost