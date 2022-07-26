import { React, useContext, useState } from 'react'
import { Flex, Input, InputGroup, InputRightElement, Button, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function Login() {


    //password field 
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    let { loginUser } = useContext(AuthContext)

    return (
        <Flex bg='none'
            w='50%' p={16}
            color='black'
            flexDir='column'
            m={10}

        >
            <Heading>Login</Heading>
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

            </form >

        </Flex>

    )
}

export default Login