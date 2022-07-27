import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'

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
        <div>
            <p>You are logged to the home page!</p>


            <ul>
                {posts.map(note => (
                    <li key={note.id} >{note.title}{note.date_created}</li>

                ))}
            </ul>
        </div>
    )
}

export default Feed