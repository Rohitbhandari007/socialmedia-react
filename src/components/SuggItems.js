import { React, useState } from 'react'
import { Flex, Avatar, Button, Text, useColorModeValue } from '@chakra-ui/react'
import useAxios from '../utils/useAxios'
import { Link } from 'react-router-dom'
import FollowButton from './smallcomponents/FollowButton'




function SuggItems({ username, ifollow, uid, profile_image }) {

    let [follow, setFolllow] = useState(ifollow)
    let api = useAxios()
    let url = '/users/follow-unfollow/'

    const bg = useColorModeValue('#fff', '#1B222E')
    const btnbgColor = useColorModeValue('#e4e5eb', '#1A202C')
    const btntextColor = useColorModeValue('#000', 'whiteAlpha.800')
    const textColor = useColorModeValue("#000", 'whiteAlpha.800')

    let followUnfollow = async () => {
        let body = {
            username: username
        }

        try {
            let response = await api.post(url, body)
            setFolllow(response.data.follow)
            console.log(response.data)

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
                <Avatar size='sm'
                    src={profile_image}
                >
                </Avatar>
                <Link to={'/user/' + username + "/" + uid}>
                    <Text ml={1} _hover={{ textDecoration: "underline", color: "whtie" }} fontSize='sm' color={textColor}>{username}</Text>
                </Link>
            </Flex>

            <Button
                bg={btnbgColor}
                color={btntextColor}
                onClick={followUnfollow}
                width='20vh'

            >{follow ?
                <Text size='sm' fontWeight="500">Unfollow</Text> :
                <Text size='sm' fontWeight='500'>Follow</Text>}
            </Button>


        </Flex >
    )
}

export default SuggItems