import React from 'react'
import { Flex, Button, Text, useColorModeValue } from '@chakra-ui/react'

function FollowButton({ kaam, folo }) {

    const btnbgColor = useColorModeValue('#e4e5eb', '#1A202C')
    const btntextColor = useColorModeValue('#000', 'whiteAlpha.800')

    return (
        <Flex>
            <Button
                bg={btnbgColor}
                color={btntextColor}
                onClick={kaam}
                width='20vh'

            >{folo ?
                <Text size='sm' fontWeight="500">Unfollow</Text> :
                <Text size='sm' fontWeight='500'>Follow</Text>}
            </Button>
        </Flex>
    )
}

export default FollowButton