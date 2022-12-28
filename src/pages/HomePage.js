import Post from "../components/Home/Post";
import CreatePost from "../components/Home/createPost";
import { useEffect, useState } from "react";

export default function HomePage(){

    const [posts, setPosts] = useState([])

    useEffect(()=>{
        fetch('/posts/')
            .then((res)=>res.json())
            .then(data=>{
                setPosts(data)
            })
    },[])

    return (
        <>
            <CreatePost />
            {posts.map((item)=><Post key={item.post_id} {...item} />)}
        </>
    
    )
}