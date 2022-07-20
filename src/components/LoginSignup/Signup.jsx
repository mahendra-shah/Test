import axios from 'axios'
import React, { useState } from 'react'


export default function Signup() {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/register', {
            name: userData.name,
            email: userData.email,
            password: userData.password
        })
            .then(res => {
                console.log('signup success', res);
                setUserData({
                    name: '',
                    email: '',
                    password: ''
                })
                alert('register success')

            })
            .catch(err => {
                console.log('something is not good');
                console.log(err);
                alert(err.response.data.error)
            })

    }

    return (
        <div>
            <form action="/register" method="POST" >

                <div className="input-container">
                    <div className="input-log-sign">
                        <label htmlFor="text">Name  </label>
                        <input type="text" name='name' value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} />
                    </div><br />
                    <div className="input-log-sign">
                        <label htmlFor="text">Email  </label>
                        <input type="email" name='email' value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} />
                    </div><br />
                    <div className="input-log-sign">
                        <label htmlFor="text">Password  </label>
                        <input type="password" name='password' value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} />
                    </div><br />
                    <div className="input-btn">
                        <input type="submit" onClick={handleSubmit} />
                    </div>
                </div>

            </form>
        </div>
    )
}
