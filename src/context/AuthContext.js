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