import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(null)
    let [loginErr, setLoginErr] = useState(null)
    let [success, setSuccess] = useState(null)
    let [likeCount, setLikeCount] = useState()
    let [like, setLike] = useState()


    const history = useHistory()

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
        })

        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history.push('/')
        } else {
            const loginErrors = 'Username or Password is incorrect'
            setLoginErr(loginErrors)


        }
    }

    let likePost = async (e) => {
        e.preventDefault()
        const postid = e.target.likebtn.value
        const pk = {
            pk: postid
        }

        const Auth = 'Bearer ' + authTokens.access

        let response = await fetch('http://127.0.0.1:8000/like-unlike/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': Auth,
            },
            body: JSON.stringify(pk)
        })
            .then((res) => res.json())
            .then((messages) => {

                const initialLike = (messages.liked)
                const likeLen = (messages.count)
                setLike(initialLike)
                setLikeCount(likeLen)


                //  console.log('Current like :' + initialLike + ', count: ' + likeLen)
                //  console.log('Prev like :' + like + ', count: ' + likeCount)


            });
        //let data = response.json()
        // console.log(data)
    }

    let followUnfollow = async (e) => {
        e.preventDefault()
        const username = e.target.follow.value

        console.log(username)


        const Auth = 'Bearer ' + authTokens.access

        let response = await fetch('http://127.0.0.1:8000/users/follow-unfollow/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': Auth,
            },
            body: JSON.stringify({ 'username': username })
        })
            .then((res) => res.json())
            .then((messages) => {

                console.log(messages)


            });

    }


    let createPost = async (e) => {

        e.preventDefault()
        const Auth = 'Bearer ' + authTokens.access
        // var data = new FormData();
        // var imagedata = document.querySelector('input[type="file"]').files[0];
        // data.append("data", imagedata);

        let response = await fetch('http://127.0.0.1:8000/posts/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': Auth,
            },
            body: JSON.stringify({ 'details': e.target.details.value, 'image': e.target.image.files[0], 'title': e.target.title.value })
        })
            .then((res) => res.json())
            .then((messages) => {

                console.log(messages)
                console.log('post created')



            });

    }
    let registerUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/users/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'email': e.target.email.value,
                'password': e.target.password.value,
                'password2': e.target.password2.value,
                'terms': true,
            })
        })
        let data = await response.json()
        const msg = data.Messege
        if (msg === 'Regestration succesful') {
            const suc = "Regestration succesfull go to login page"
            setSuccess(suc)
        } else {
            console.log(data.errors)
            const errors = data.errors
            for (let i in errors) {
                console.log(errors[i][0])
                setError(errors[i][0])
            }
        }
    }



    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/login')
    }



    let contextData = {
        user: user,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        setUser: setUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
        error: error,
        loginErr: loginErr,
        success: success,
        likePost: likePost,
        likeCount: likeCount,
        like: like,
        createPost: createPost,
        followUnfollow: followUnfollow,

    }


    useEffect(() => {

        if (authTokens) {
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)


    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}