import { React, useEffect, useState } from 'react'
import { Flex, Avatar, Text, Menu, MenuButton, Button, Divider } from '@chakra-ui/react'
import useAxios from '../utils/useAxios'



function Profile() {

    let [userinfo, setUserinfo] = useState([])

    let api = useAxios()

    useEffect(() => {
        getUserInfo()
    }, [])


    let getUserInfo = async () => {

        try {
            let response = await api.get('/users/profile/')
            console.log(response.data)
            setUserinfo(response.data)

        } catch (error) {
            console.log(error)
        }


    }

    return (
        <>
            <Flex flexDir='row' justifyContent='space-between' w='100vh' mt={2}>
                <Flex flexDir='column' w="50vh" alignItems='start'>
                    <Avatar size='lg'></Avatar>
                    <Text fontSize='lg'>{userinfo.username}</Text>
                    <Text fontSize='sm'>Nice quote is not a bio</Text>

                    <Flex flexDir='row' justifyContent='space-between' w='30vh'>
                        <Text fontSize='sm'>{userinfo.followers} Followers</Text>
                        <Text fontSize='sm'>{userinfo.following} Following</Text>

                    </Flex>

                </Flex>
                <Button>Edit Profile</Button>

            </Flex>
            <Divider></Divider>
        </>
    )
}

export default Profile