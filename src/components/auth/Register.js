import React from 'react'
import { Flex, Input, InputGroup, InputRightElement, Button, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Register() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Flex bg='none'
            w='50%' p={16}
            color='black'
            flexDir='column'
            m={10}

        >
            <Heading>Sign up</Heading>

            <Input placeholder='Username' size='md' mt={2} />
            <Input placeholder='Email' type='email' size='md' mt={2} />

            <InputGroup size='md' mt={2}>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
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
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Button colorScheme='blue' mt={2}>Sign up</Button>
            <Flex mt={5} alignItems='center'>
                <Text size='md'>
                    Already have an account ?
                </Text>
                <Link to='/login'>
                    <Button ml={2}> Login</Button>

                </Link>
            </Flex>

        </Flex>

    )
}

export default Register