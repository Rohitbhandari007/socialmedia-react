import React, { useState, useEffect, useCallback } from 'react'
import { Grid, GridItem, Flex, Text, Input, Button, Spinner, Box, useColorModeValue } from '@chakra-ui/react'
import Nav from '../components/Nav'
import PostItem from './PostItem'
import useAxios from '../utils/useAxios'
import { withRouter, useHistory } from 'react-router-dom'



function PostDetail(props) {

    const history = useHistory()

    const bg = useColorModeValue('#f0f0f5', '#1B222E')

    let [posts, setposts] = useState([])
    let [author, setAuthor] = useState([])
    let [loading, setLoading] = useState(false)
    let [comments, setComments] = useState([])
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

        const body = {
            pk: pid
        }

        console.log(body)
        let url = '/list-comment/'

        try {
            let response = await api.post(url, body)
            console.log(response.data)
            setComments(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    let postComment = async (e) => {


        let comment = e.target.comment.value

        const body = {
            pk: pid,
            body: comment
        }

        console.log(body)
        let url = '/comment/'

        try {
            let response = await api.post(url, body)
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
                            comment_count={posts.comment_count}
                        ></PostItem>

                        <Flex flexDir='column'>
                            <form onSubmit={postComment}>

                                <Flex flexDir='row' mt="2vh" justifyContent='space-between'>
                                    <Input name='comment' variant='filled' placeholder='Enter a comment.....' w='60vh'></Input>
                                    <Button variant='solid' size='md' type='submit' ><Text fontSize='sm' fontWeight='200'>Comment</Text></Button>

                                </Flex>
                            </form>

                        </Flex>
                        <Flex flexDir='column'>
                            {comments.map(comment => (
                                <Box
                                    borderRadius='sm'
                                    bg={bg}
                                    mt={2}
                                    p={2}
                                    key={comment.id}
                                    fontSize='sm'
                                    boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"

                                >
                                    <Flex justifyContent='space-between'>
                                        <Text fontSize='xs' color='whiteAlpha.600'>@{comment.author.username} [ {comment.created} ]</Text>
                                        <Text fontSize='xs' color='whiteAlpha.600'>{comment.like_count} likes</Text>
                                    </Flex>

                                    <Flex justifyContent='space-between'>

                                        <Text>{comment.body}</Text>
                                    </Flex>

                                </Box>

                            ))}
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


        </Grid >
    )
}

export default withRouter(PostDetail)