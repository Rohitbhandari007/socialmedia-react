import { React, useState, useEffect } from 'react'
import Nav from '../components/Nav'
import { Grid, GridItem, Spinner, Flex, Text, Avatar, Divider, Image, useColorModeValue } from '@chakra-ui/react'
import { withRouter } from 'react-router-dom'
import useAxios from '../utils/useAxios'
import PostItem from '../components/PostItem'
import FollowButton from '../components/smallcomponents/FollowButton'


function PublicProfilePage(props) {


    let [user, setUser] = useState([])
    let [userposts, setuserPosts] = useState([])
    let [loading, setLoading] = useState(false)
    const bg = useColorModeValue('#f0f0f5', '#1B222E')

    let username = props.match.params.username
    let uid = props.match.params.id


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
            setLoading(true)
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
            {loading ?

                < GridItem >

                    <Flex flexDir='row' justifyContent='space-between' w='80vh' mt={2}>
                        <Flex flexDir='column' boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)" bg={bg}
                            p={2}
                        >
                            <Image
                                src={'http://127.0.0.1:8000' + user.cover_image}
                                borderRadius='sm'
                                objectFit='cover'
                                objectPosition='center center'
                                h={{ sm: '20vh', md: '30vh' }} w={{ sm: '50vh', md: '80vh' }}
                            />
                            <Flex flexDir='column' w="50vh" alignItems='start' zIndex={1} mt={-10}>
                                <Avatar size='lg' src={'http://127.0.0.1:8000' + user.profile_image}></Avatar>
                                <Text fontSize='lg'>{user.username}</Text>
                                <Text fontSize='sm'>Nice quote is not a bio</Text>

                                <Flex flexDir='row' justifyContent='space-between' w='30vh'>
                                    <Text fontSize='sm'>{user.followers} Followers</Text>
                                    <Text fontSize='sm'>{user.following} Following</Text>

                                </Flex>

                            </Flex>
                            {/* <FollowButton
                            kaam={followUnfollow}
                            folo={follow}
                        >
                        </FollowButton> */}


                        </Flex>

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
                            profile_image={note.author.profile_image}
                            likedBy={note.liked}
                            iliked={note.iliked}
                            // likeState={like} gives true or false value
                            uid={note.author.id}
                            postImage={note.image}
                        ></PostItem>
                    ))}
                </GridItem>
                :
                <Spinner
                    size='xl'
                    alignSelf='center'
                    speed='1s'
                    thickness='4px'
                    emptyColor='gray.200'
                    color='blue.500'
                    mt={{ sm: '100px', md: '200px' }} />
            }

        </Grid >
    )
}

export default withRouter(PublicProfilePage)