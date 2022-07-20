import axios from 'axios'
import React, { useState } from 'react'

export default function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("i am working")
        axios.post('/login', {
            email: userData.email,
            password: userData.password
        }, {
            headers: {
                'Content-Type': 'application/json'
              }
        })
            .then(res => {
                console.log('login success')
                localStorage.setItem('authToken', res.data.cookie)
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
                    <input type="submit" onClick={handleSubmit} />
                </div>

            </form>
        </div>
    )
}
