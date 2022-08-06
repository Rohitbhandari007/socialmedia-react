import { React, useEffect, useState } from 'react'
import { Flex, Avatar, Text, Spinner, Image, Button, Divider, useColorModeValue } from '@chakra-ui/react'
import useAxios from '../utils/useAxios'
import PostItem from './PostItem'



function Profile() {

    let [userinfo, setUserinfo] = useState([])
    let [userposts, setuserPosts] = useState([])
    let [loading, setLoading] = useState(false)


    const bg = useColorModeValue('#f0f0f5', '#1B222E')


    let api = useAxios()

    useEffect(() => {
        getUserInfo();
        getUserPosts();

    }, [])


    let getUserInfo = async () => {

        try {
            let response = await api.get('/users/profile/')
            console.log(response.data)
            setUserinfo(response.data)
            setLoading(true)
        } catch (error) {
            console.log(error)

        }
    }
    let getUserPosts = async () => {

        try {
            let response = await api.get('/')
            setuserPosts(response.data)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {loading ? <div>
                <Flex flexDir='row' justifyContent='space-between' w='80vh' mt={2}>

                    <Flex flexDir='column' boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)" bg={bg}
                        p={2}
                    >
                        <Image
                            src={'http://127.0.0.1:8000' + userinfo.cover_image}
                            borderRadius='sm'
                            objectFit='cover'
                            objectPosition='center center'
                            h={{ sm: '20vh', md: '30vh' }} w={{ sm: '50vh', md: '80vh' }}
                        />
                        <Flex flexDir='column' w="50vh" alignItems='start' zIndex={1} mt={-10}>
                            <Avatar size='lg' src={'http://127.0.0.1:8000' + userinfo.profile_image}></Avatar>
                            <Text fontSize='lg'>{userinfo.username}</Text>
                            <Text fontSize='sm'>Nice quote is not a bio</Text>

                            <Flex flexDir='row' justifyContent='space-between' w='30vh'>
                                <Text fontSize='sm'>{userinfo.followers} Followers</Text>
                                <Text fontSize='sm'>{userinfo.following} Following</Text>

                            </Flex>

                        </Flex>

                        <Button><Text fontSize='sm'>Edit Profile</Text></Button>


                    </Flex>




                </Flex >
                <Flex flexDir='column'
                    width={{
                        sm: '50vh',
                        md: '80vh'
                    }}
                >
                    {userposts.map(note => (

                        <PostItem
                            key={note.id}
                            postId={note.id}
                            details={note.details}
                            title={note.title}
                            created={note.date_created}
                            username={note.author.username}
                            profile_image={note.author.profile_image}
                            likes={note.like_count}
                            likedBy={note.liked}
                            iliked={note.iliked}
                            uid={note.author.id}
                            // likeState={like} gives true or false value

                            postImage={note.image}
                        ></PostItem>
                    ))}
                </Flex>
            </div>
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
        </>
    )
}

export default Profile