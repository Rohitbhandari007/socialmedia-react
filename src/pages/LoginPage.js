import { React, useContext, useState } from 'react'
import {
    Flex, Input, InputGroup, InputRightElement,
    Button, Heading, Text, useColorMode, useColorModeValue,
    IconButton, Alert, AlertIcon, AlertDescription, AlertTitle
}
    from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { FaMoon, FaSun } from 'react-icons/fa';


function Login() {

    //alert



    //theming
    const { toggleColorMode } = useColorMode()
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);


    //password field 
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    let { loginUser, loginErr } = useContext(AuthContext)

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
                <Flex mt={5} alignItems='center'>
                    <Text size='md'>
                        Forgot password
                    </Text>
                    <Button ml={2}> Reset </Button>

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


        </Flex>


    )
}

export default Login