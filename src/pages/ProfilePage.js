import Post from "../components/Home/Post";
import Avatar from "../components/Profile/Avatar/Avatar";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { CssVarsProvider } from "@mui/joy";


export default function ProfilePage() {

  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    const requestOptions = {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
        },
    };

    fetch('/posts/', requestOptions)
        .then((res)=>res.json())
        .then(data=>{
            setPosts(data)
        })
},[])

  return (
    <CssVarsProvider>
    <div className='profile'>
      <Avatar />
      {posts.map((item)=><Post key={item.post_id} {...item} />)}
    </div>
    </CssVarsProvider>
  );
}