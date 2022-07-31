import React from 'react'

import {
    Button, Modal, ModalBody, ModalContent, ModalHeader, Text, ModalFooter, ModalOverlay, useDisclosure, ModalCloseButton, Input,
    Flex
} from '@chakra-ui/react'

function CreatePost() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button mt={2} variant='outline' onClick={onOpen}>Create Post</Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex
                            flexDir='column'
                            justifyContent='space-between'
                        >
                            <Input placeholder='Details' mb={2}></Input>
                            <input type='file'></input>
                        </Flex>


                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='blue'>Post</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreatePost