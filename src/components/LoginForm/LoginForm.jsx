import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import "./loginForm.css"
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";



export default function LoginForm(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const cookies = new Cookies();
    
    const loginSubmit = (event)=>{
        event.preventDefault();
        fetch('/auth/login',requestOptions)
            .then(res=>res.json())
            .then(data=>{
                if(data.error===undefined){
                    setMessage("You Are Logged in Successfully.")
                    cookies.set("TOKEN", data.token, {
                        path: "/",
                      });
                    window.location.href = "/";
                }
                else{
                    setMessage(data.error)
                }
            })
            .catch(err=>{console.log(err)})
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: username,
                password: password,
            })
    };

    useEffect(()=>{

    },[message])

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            className="login-form"
            onSubmit={loginSubmit}
        >
                <Typography variant="h2" gutterBottom>
                    Sign In
                </Typography>
                <TextField
                    id="outlined-required"
                    label="Username"
                    value={username}
                    onChange={(event)=> {setUsername(event.target.value)}}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event)=> {setPassword(event.target.value)}}
                />
                      <Typography 
                            variant="subtitle2"
                            color={message.includes('Success')?"green":"red"}
                            gutterBottom>
                            {message}
                        </Typography>
                <Button variant="contained" type="submit">Login</Button>
        </Box>
    )
}

