import { React, useContext, useState } from 'react'
import {
    Button, Modal, ModalBody, ModalContent, ModalHeader, Text, ModalFooter, ModalOverlay, useDisclosure, ModalCloseButton, Input,
    Flex, Link
} from '@chakra-ui/react'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'




function CreatePost() {
    let { createPost } = useContext(AuthContext)

    let api = useAxios()
    let url = '/posts/'

    let postCreate = async (e) => {

        e.preventDefault();

        let form_data = new FormData();
        form_data.append('image', e.target.image.files[0]);
        form_data.append('title', e.target.title.value);
        form_data.append('details', e.target.details.value);
        try {
            let response = await api.post(url, form_data)
            console.log(response.data)
        } catch (error) {
            // console.log(error)
            console.log(error.response.data)
        }
    }



    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button mt={2} onClick={onOpen}><Text fontSize='sm' fontWeight='400'>Create Post</Text></Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={postCreate}>
                    <ModalContent>
                        <ModalHeader>Create Post</ModalHeader>
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
        </>
    )
}

export default CreatePost