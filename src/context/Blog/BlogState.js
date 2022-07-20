import blogContext from "./BlogContext";
import axios from "axios";

import { useEffect, useState } from "react";

const BlogStat =  (props)=>{

    const [BlogsData, setBlogsData] = useState([])

    const getBlogsData = async ()=>{
        const Data = await axios.get('http://localhost:4000/api/secret-of-all-blogs')
        setBlogsData(Data.data)
    }

    useEffect(()=>{
        getBlogsData()
    },[])

    const values = {
        BlogsData
    }

    return (
        <blogContext.Provider value={values}>
            {props.children}
        </blogContext.Provider>
    )
}

export default BlogStat;