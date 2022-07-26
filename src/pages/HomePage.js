import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'

const HomePage = () => {
    let [notes, setNotes] = useState([])
    let { authTokens, logoutUser } = useContext(AuthContext)

    let api = useAxios()

    useEffect(() => {
        getNotes()
    }, [])


    let getNotes = async () => {
        let response = await api.get('/')

        if (response.status === 200) {
            setNotes(response.data)
            console.log(response.data)
        }

    }

    return (
        <div>
            <p>You are logged to the home page!</p>


            <ul>
                {notes.map(note => (
                    <li key={note.id} >{note.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default HomePage