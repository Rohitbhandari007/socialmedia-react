import React from 'react'

function Register() {
    return (
        <Flex bg='none'
            w='50%' p={16}
            color='white'
            flexDir='column'
            m={10}

        >
            <Heading>Login</Heading>

            <Input placeholder='Username' size='md' mt={2} />
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
            <Button colorScheme='blue' mt={2}>Login</Button>
            <Flex mt={5} alignItems='center'>
                <Text size='md'>
                    Dont have an account ?
                </Text>
                <Button backgroundColor='#333' ml={2}> Register</Button>
            </Flex>

        </Flex>

    )
}

export default Register