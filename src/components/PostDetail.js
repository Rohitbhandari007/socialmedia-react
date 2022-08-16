import React, { useState, useEffect } from 'react'
import { Grid, GridItem, Flex, Text, Input, Button, Spinner } from '@chakra-ui/react'
import Nav from '../components/Nav'
import PostItem from './PostItem'
import useAxios from '../utils/useAxios'
import { withRouter } from 'react-router-dom'



function PostDetail(props) {

    let [posts, setposts] = useState([])
    let [author, setAuthor] = useState([])
    let [loading, setLoading] = useState(false)

    let pid = props.match.params.id


    let api = useAxios()


    useEffect(() => {
        getposts()
        getComments()
    }, [])


    let getposts = async () => {
        try {
            let url = '/posts/' + props.match.params.id + '/'

            let response = await api.get(url)
            setposts(response.data)
            setAuthor(response.data.author)
            setLoading(true)

        } catch (error) {
            console.log(error)
        }
    }

    let getComments = async () => {

        let body = {
            pk: pid
        }

        console.log(body)
        let url = '/comment/'

        try {
            let response = await api.get(url, body)
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
                {loading ?

                    <Flex width={['40vh', '80vh']} flexDir='column'>
                        <PostItem
                            key={posts.id}
                            postId={posts.id}
                            details={posts.details}
                            title={posts.title}
                            created={posts.date_created}
                            username={author.username}
                            profile_image={author.profile_image}
                            uid={author.id}
                            likes={posts.like_count}
                            likedBy={posts.liked}
                            iliked={posts.iliked}
                            postImage={posts.image}
                        ></PostItem>

                        <Flex flexDir='column'>
                            <Text>
                                comments
                            </Text>
                            <Flex flexDir='row'>
                                <Input variant='filled'></Input>
                                <Button variant='solid' colorScheme='messenger'>Comment</Button>
                            </Flex>
                        </Flex>

                    </Flex>
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

            </GridItem>


        </Grid>
    )
}

export default withRouter(PostDetail)