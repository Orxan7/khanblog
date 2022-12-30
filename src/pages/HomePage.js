import Post from "../components/Home/Post";
import CreatePost from "../components/Home/createPost";
import { useEffect } from "react";
import { addPosts } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";


export default function HomePage(){

    const dispatch = useDispatch()

    const posts = useSelector((state) => state.posts)

    useEffect(()=>{

        const requestOptions = {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
            },
        };

        fetch('/posts/', requestOptions)
            .then((res)=>res.json())
            .then(data=>{
                dispatch(addPosts(data))
            })
    },[])

    return (
        <>
            <CreatePost />
            {([].concat(posts).reverse()).map((item)=><Post key={item.post_id} {...item} />)}
        </>
    
    )
}