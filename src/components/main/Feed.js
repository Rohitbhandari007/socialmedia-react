import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'


function Feed() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/')
            .then(res => {
                console.log(res)
                setPosts(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>

            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}

        </div>
    )
}

export default Feed