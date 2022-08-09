import { React, useState, useContext } from 'react'
import { Flex, Button, Text, useColorModeValue } from '@chakra-ui/react'
import useAxios from '../../utils/useAxios'
import AuthContext from '../../context/AuthContext'

function FollowButton({ ifollow, username, uid }) {

    let { user } = useContext(AuthContext)


    let api = useAxios()
    let url = '/users/follow-unfollow/'
    const btnbgColor = useColorModeValue('#e4e5eb', '#1A202C')
    const btntextColor = useColorModeValue('#000', 'whiteAlpha.800')

    let [follow, setFollow] = useState(ifollow)

    console.log('Before click')
    console.log(follow)
    console.log(ifollow)

    let followUnfollow = async () => {
        let body = {
            username: username
        }

        try {
            let response = await api.post(url, body)
            setFollow(response.data.follow)

            console.log('After click')
            console.log(follow)
            console.log(ifollow)

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Flex
            display={user.user_id === uid ? 'none' : 'flex'}>
            <Button
                bg={btnbgColor}
                color={btntextColor}
                onClick={followUnfollow}
                width='20vh'

            >{follow ?
                <Text size='sm' fontWeight="500">Unfollow</Text> :
                <Text size='sm' fontWeight='500'>Follow</Text>}
            </Button>
        </ Flex>
    )
}

export default FollowButton