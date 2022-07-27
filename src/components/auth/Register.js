import { React, useContext, useState } from 'react'
import {
    Flex, Input, InputGroup, InputRightElement, Button, Heading, Text, useColorMode, useColorModeValue,
    IconButton, Alert, AlertDescription, AlertIcon
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { FaMoon, FaSun } from 'react-icons/fa';



function Register() {

    const { toggleColorMode } = useColorMode()
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    let { registerUser, error, success } = useContext(AuthContext)

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
            flexDir='column'
            m={10}


        >
            <Flex
                justifyContent='space-between'
                alignItems='center'

            >
                <Heading>Sign up</Heading>
                <IconButton
                    size="sm"
                    fontSize="lg"
                    variant="ghost"
                    color="current"
                    onClick={toggleColorMode}
                    icon={<SwitchIcon />}
                />
            </Flex>

            <form onSubmit={registerUser}>
                <Input placeholder='Username' name='username' size='md' mt={2} required />
                <Input placeholder='Email' name='email' type='email' size='md' mt={2} required />

                <InputGroup size='md' mt={2}>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        name='password'
                        required
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <InputGroup size='md' mt={2}>
                    <Input

                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Confirm password'
                        name='password2'
                        required
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button type='submit' colorScheme='blue' mt={2}>Sign up</Button>
                <Flex mt={5} alignItems='center'>
                    <Text size='md'>
                        Already have an account ?
                    </Text>
                    <Link to='/login'>
                        <Button ml={2}> Login</Button>

                    </Link>
                </Flex>
                <Flex

                >
                    {error &&
                        <Alert status='error'
                            mt={4}
                        >
                            <AlertIcon />
                            <AlertDescription>{error && error}</AlertDescription>

                        </Alert>}
                    {success &&
                        <Alert status='success'
                            mt={4}
                        >
                            <AlertIcon />
                            <AlertDescription>{success && success}</AlertDescription>

                        </Alert>}

                </Flex>
            </form>

        </Flex>


    )
}

export default Register