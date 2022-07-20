import axios from 'axios'
import { useState } from 'react'

function Post() {

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: ""
    })

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            await axios.post('http://localhost:4000/blog', {
                title: postData.title,
                content: postData.content,
                image: postData.image
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': JSON.stringify(localStorage.getItem('authToken'))
                }
            })
            console.log('hello im here');
            setPostData({
                email: '',
                password: ''
            })
            alert('blog post success')



        } catch (error) {
            console.log('something is not good');
            alert(error.response.data.error)
        }
    }

    return (
        <div>
            <form action="/blog" method="POST" >

                <div className="input-container">
                    <div className="input-log-sign">
                        <label htmlFor="text">Email</label>
                        <input type="title" name='title' value={postData.title} onChange={e => setPostData({ ...postData, title: e.target.value })} />
                    </div><br />
                    <div className="input-log-sign">
                        <label htmlFor="text">Password</label>
                        <textarea type="text" name='content' value={postData.content} onChange={e => setPostData({ ...postData, content: e.target.value })} />
                    </div><br />
                    <div className="input-log-item">
                        <label htmlFor="image">Image</label>
                        <input type="file" name='image' onChange={e => setPostData({ ...postData, image: e.target.files[0] })} />
                    </div>
                </div>
                <div className="input-btn">
                    <input type="submit" onClick={handleSubmit} />
                </div>

            </form>
        </div>
    )
}

export default Post