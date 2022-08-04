import { React, useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Profile from '../components/Profile'
import { Grid, GridItem, Button, Flex, Text, Avatar, Divider } from '@chakra-ui/react'
import { withRouter } from 'react-router-dom'
import useAxios from '../utils/useAxios'
import PublicProfile from '../components/PublicProfile'
import PostItem from '../components/PostItem'



function PublicProfilePage(props) {


    let [user, setUser] = useState([])
    let [userposts, setuserPosts] = useState([])

    let username = props.match.params.username
    let uid = props.match.params.id

    console.log(uid)



    let api = useAxios()

    useEffect(() => {
        getUser()
        getUserPosts()

    }, [])

    let getUser = async () => {

        let url = '/users/userprofile/'
        let body = {
            username: username,
        }

        try {
            let response = await api.post(url, body)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }



    }

    let getUserPosts = async () => {
        let url = '/profile-post/'

        let body = {
            uid: uid
        }
        try {
            let response = await api.post(url, body)
            setuserPosts(response.data)

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
                        <Avatar size='lg' src={'http://127.0.0.1:8000' + user.profile_image}></Avatar>
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
                {userposts.map(note => (

                    <PostItem
                        key={note.id}
                        postId={note.id}
                        details={note.details}
                        title={note.title}
                        created={note.date_created}
                        username={note.author.username}
                        likes={note.like_count}
                        likedBy={note.liked}
                        iliked={note.iliked}
                        // likeState={like} gives true or false value

                        postImage={note.image}
                    ></PostItem>
                ))}
            </GridItem>


        </Grid>
    )
}

export default withRouter(PublicProfilePage)