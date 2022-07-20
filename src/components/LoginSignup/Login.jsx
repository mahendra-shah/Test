import axios from 'axios'
import React, { useState } from 'react'

export default function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    console.log("i am working")
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/login', {
            email: userData.email,
            password: userData.password
        })
            .then(res => {
                console.log('login success', res);
                setUserData({
                    email: '',
                    password: ''
                })
                alert('login success')

            })
            .catch(err => {
                console.log('something is not good');
                console.log(err);
                alert(err.response.data.error)
            })
    }

    return (
        <div>
            <form action="/login" method="POST">

                <div className="input-container">
                    <div className="input-log-sign">
                        <label htmlFor="text">Email</label>
                        <input type="email" name='email' value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} />
                    </div><br />
                    <div className="input-log-sign">
                        <label htmlFor="text">Password</label>
                        <input type="password" name='password' value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} />
                    </div><br />
                </div>
                <div className="input-btn">
                    <input type="submit" onSubmit={handleSubmit} />
                </div>

            </form>
        </div>
    )
}
