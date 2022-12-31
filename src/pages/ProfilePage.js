import Post from "../components/Home/Post";
import Avatar from "../components/Profile/Avatar/Avatar";
import { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy";
import { useSelector } from "react-redux";
import CreatePost from "../components/Home/CreatePost";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";


export default function ProfilePage() {

  const [posts, setPosts] = useState([])
  const [username, setUsername] = useState(null)
  const { id } = useParams()
  
  const auth = useSelector((state) => state.auth);

  useEffect(()=>{
    const requestOptions = {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
        },
    };

    fetch(`/api/user/${id}`, requestOptions)
        .then((res)=>res.json())
        .then(data=>{
            setUsername(data.username)
            setPosts(data.array)
        })
},[])

  return (
    <CssVarsProvider>
      <div className='profile'>
    {username?(
         <> 
          <Avatar username={username}/>
          <Typography variant="h1" sx={{textAlign: 'center'}} gutterBottom>
            {"@"+username}
          </Typography>
          {auth.id===Number(id)?(<CreatePost />): null}
          {([].concat(posts).reverse()).map((item)=><Post key={item.post_id} {...item} />)}
          </>
    ):username===undefined?<PageNotFound />:null
    }  
    </div>
    </CssVarsProvider>
  );
}