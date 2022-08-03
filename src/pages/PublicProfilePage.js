import { React, useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Profile from '../components/Profile'
import { Grid, GridItem, Button, Flex, Text, Avatar, Divider } from '@chakra-ui/react'
import { withRouter } from 'react-router-dom'
import useAxios from '../utils/useAxios'
import PublicProfile from '../components/PublicProfile'



function PublicProfilePage(props) {


    let [user, setUser] = useState([])
    let username = props.match.params.username
    console.log(username)



    let api = useAxios()

    useEffect(() => {
        getUser()

    }, [])

    let getUser = async () => {

        let url = '/users/userprofile/'
        let body = {
            username: username,
        }

        try {
            let response = await api.post(url, body)
            setUser(response.data)
            console.log(response.data)

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Grid templateColumns='repeat(5, 1fr)' gap={2}>
            <GridItem colSpan={2}>
                <Nav />
            </GridItem>
            <GridItem>
                <Flex flexDir='row' justifyContent='space-between' w='80vh' mt={2}>
                    <Flex flexDir='column' w="50vh" alignItems='start'>
                        <Avatar size='lg'></Avatar>
                        <Text fontSize='lg'>{user.username}</Text>
                        <Text fontSize='sm'>Nice quote is not a bio</Text>

                        <Flex flexDir='row' justifyContent='space-between' w='30vh'>
                            <Text fontSize='sm'>{user.followers} Followers</Text>
                            <Text fontSize='sm'>{user.following} Following</Text>

                        </Flex>

                    </Flex>
                    <Button>Edit Profile</Button>

                </Flex>
                <Divider></Divider>
                <Flex flexDir='column'
                    width={{
                        sm: '50vh',
                        md: '80vh'
                    }}
                >
                </Flex>
            </GridItem>


        </Grid>
    )
}

export default withRouter(PublicProfilePage)