import { React, useContext, useState, useRef } from 'react'
import {
    Flex, Input, InputGroup, InputRightElement,
    Button, Heading, Text, useColorMode, useColorModeValue,
    IconButton, Alert, AlertIcon, AlertDescription,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure,
    useToast
}
    from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { FaMoon, FaSun } from 'react-icons/fa';
import axios from 'axios';


function Login() {

    const toast = useToast()
    const toastIdRef = useRef()


    const { isOpen, onOpen, onClose } = useDisclosure()

    const [resetError, setResetError] = useState([])
    const [resetRes, setResetRes] = useState()

    //theming
    const { toggleColorMode } = useColorMode()
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);


    //password field 
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    let { loginUser, loginErr } = useContext(AuthContext)

    function addToast() {
        toastIdRef.current = toast({ description: 'some text' })
    }


    let sendPasswordResetEmail = async () => {
        try {
            let email = document.getElementById('email').value
            let body = {
                email: email
            }
            let url = 'http://127.0.0.1:8000/users/send-reset-password-email/'

            let response = await axios.post(url, body)
            console.log(response.data.msg)
            setResetRes(response.data.msg)
        } catch (error) {
            console.log(error.response.data.errors)
            setResetError(error.response.data.errors)
            console.log(resetError)
        }
    }

    return (

        <Flex bg='none'
            w={{
                sm: '50%',
                md: '50%',
            }}
            p={{
                sm: '10%',
                md: '20px',
            }}
            m={10}
            flexDir='column'

        >
            <Flex
                justifyContent='space-between'
                alignItems='center'

            >
                <Heading>Login</Heading>
                <IconButton
                    size="sm"
                    fontSize="lg"
                    variant="ghost"
                    color="current"
                    onClick={toggleColorMode}
                    icon={<SwitchIcon />}
                />
            </Flex>

            <form onSubmit={loginUser}>


                <Input placeholder='Username' name='username' size='md' mt={2} required />
                <InputGroup size='md' mt={2}>
                    <Input
                        pr='4.5rem'
                        name='password'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        required
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button type='submit' colorScheme='blue' mt={2}>Login</Button>
                <Flex mt={5} alignItems='center'>
                    <Text size='md'>
                        Dont have an account ?
                    </Text>
                    <Link to='/register'>
                        <Button ml={2}> Sign up</Button>

                    </Link>
                </Flex>

                <Flex

                >
                    {loginErr &&
                        <Alert status='error'
                            mt={4}
                        >
                            <AlertIcon />
                            <AlertDescription>{loginErr && loginErr}</AlertDescription>

                        </Alert>}


                </Flex>

            </form >

            <Flex mt={5} alignItems='center'>
                <Text size='md'>
                    Forgot password
                </Text>
                <Button ml={2} onClick={onOpen}> Reset </Button>
                {/* <form onSubmit={sendPasswordResetEmail}> */}
                <Modal
                    isCentered
                    onClose={onClose}
                    isOpen={isOpen}
                    motionPreset='slideInBottom'
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Enter you email </ModalHeader>
                        {resetRes &&
                            <Alert status='success'
                                mt={4}
                            >
                                <AlertIcon />
                                <AlertDescription>{resetRes}</AlertDescription>

                            </Alert>}
                        {resetError.length === 0 ?
                            <></>
                            :
                            <>
                                <Alert status='error'
                                    mt={4}
                                >
                                    <AlertIcon />
                                    <AlertDescription>{resetError.email}</AlertDescription>
                                    <AlertDescription>{resetError.non_field_errors}</AlertDescription>


                                </Alert>
                            </>
                        }
                        <ModalCloseButton />
                        <ModalBody>
                            <Input type='email' placeholder='Submit your email' name='email' id='email'></Input>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant='ghost' type='submit' onClick={sendPasswordResetEmail}> Submit</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                {/* </form> */}
            </Flex>



        </Flex >


    )
}

export default Login