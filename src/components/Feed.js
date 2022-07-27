import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'
import PostItem from './PostItem'
import { Flex } from '@chakra-ui/react'


function Feed() {
    let [posts, setposts] = useState([])
    let { authTokens, logoutUser } = useContext(AuthContext)

    let api = useAxios()

    useEffect(() => {
        getposts()
    }, [])


    let getposts = async () => {
        let response = await api.get('/')

        if (response.status === 200) {
            setposts(response.data)
        }
    }

    return (

        <Flex flexDir='column'
            width={{
                sm: '50vh',
                md: '80vh'
            }}
        >
            {posts.map(note => (

                <PostItem key={note.id}
                    details={note.details}
                    title={note.title}
                    created={note.date_created}
                    username={note.author.username}
                    postImage="http://127.0.0.1:8000/media/post/image/virajbhatata_LeZaQcr.jpg"
                ></PostItem>
            ))}


        </Flex>
    )
}

export default Feed