import { React, useEffect, useState } from 'react'
import { Flex, Avatar, Text, Menu, MenuButton, Button, Divider } from '@chakra-ui/react'
import useAxios from '../utils/useAxios'
import PostItem from './PostItem'



function Profile() {

    let [userinfo, setUserinfo] = useState([])
    let [userposts, setuserPosts] = useState([])


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

        } catch (error) {
            console.log(error)
        }
    }
    let getUserPosts = async () => {

        try {
            let response = await api.get('/')
            console.log(response.data)
            setuserPosts(response.data)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Flex flexDir='row' justifyContent='space-between' w='80vh' mt={2}>
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
                        likes={note.like_count}
                        likedBy={note.liked}
                        iliked={note.iliked}
                        // likeState={like} gives true or false value

                        postImage={note.image}
                    ></PostItem>
                ))}


            </Flex>
        </>
    )
}

export default Profile