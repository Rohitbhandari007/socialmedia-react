import { React, useContext, useState } from 'react'
import { Flex, Input, InputGroup, InputRightElement, Button, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'


function Register() {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    let { registerUser, error } = useContext(AuthContext)

    return (
        <Flex bg='none'
            w='50%' p={16}
            color='black'
            flexDir='column'
            m={10}

        >
            <Heading>Sign up</Heading>
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
            </form>
            <Text>{error && error}</Text>
        </Flex>

    )
}

export default Register