import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'
import PostItem from './PostItem'
import { Flex, Spinner } from '@chakra-ui/react'


function Feed() {
    let [posts, setposts] = useState([])
    let [loading, setLoading] = useState(false)
    let { authTokens, logoutUser } = useContext(AuthContext)

    let api = useAxios()

    useEffect(() => {
        getposts()
    }, [])


    let getposts = async () => {
        let response = await api.get('/posts/')

        if (response.status === 200) {
            setposts(response.data)
            setLoading(true)
            console.log(response.data)

        }
    }

    return (

        <Flex flexDir='column'
            width={{
                sm: '50vh',
                md: '80vh'
            }}
        >
            {loading ?
                <>  {posts.map(note => (

                    <PostItem
                        key={note.id}
                        postId={note.id}
                        details={note.details}
                        title={note.title}
                        created={note.date_created}
                        username={note.author.username}
                        profile_image={note.author.profile_image}
                        uid={note.author.id}
                        likes={note.like_count}
                        likedBy={note.liked}
                        iliked={note.iliked}
                        postImage={note.image}
                    ></PostItem>
                ))}</>
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




        </Flex>
    )
}

export default Feed