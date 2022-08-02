import { React, useState } from 'react'
import { Flex, Avatar, Button, Text, useColorModeValue } from '@chakra-ui/react'
import useAxios from '../utils/useAxios'

function SuggItems({ username }) {

    let followinitValue = 'Follow'
    let [follow, setFolllow] = useState(followinitValue)

    let api = useAxios()
    let url = '/users/follow-unfollow/'

    const bg = useColorModeValue('#fff', '#1B222E')
    const btnbgColor = useColorModeValue('#e4e5eb', '#1A202C')
    const btntextColor = useColorModeValue('#000', '#fff')

    let followUnfollow = async () => {
        let body = {
            username: username
        }

        try {
            let response = await api.post(url, body)
            setFolllow(response.data.state)

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Flex
            m={2}
            flexDir='row'
            borderRadius='lg'
            justifyContent='space-around'
            height='10vh'
            alignItems='center'
            p={5}
            cursor='pointer'
            bg={bg}
        >
            <Flex
                flexDir='row'
                l={0}
                alignItems='center'
                w="25vh"
            >
                <Avatar size='sm'>

                </Avatar>

                <Text ml={1} _hover={{ textDecoration: "underline", color: "whtie" }}>{username}</Text>
            </Flex>

            <Button
                bg={btnbgColor}
                color={btntextColor}
                _hover={{ backgroundColor: "#000", color: '#fff' }}
                onClick={followUnfollow}
                width='20vh'

            >{follow && <>{follow} </>}</Button>
        </Flex >
    )
}

export default SuggItems