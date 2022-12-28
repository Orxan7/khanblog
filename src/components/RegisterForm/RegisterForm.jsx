import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import "./registerForm.css"
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useState} from "react";


export default function RegisterForm(){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordnd, setPasswordnd] = useState("");
    const [error, setError] = useState("");

    const onsubmit = (e)=>{
        e.preventDefault();
        fetch('/auth/register',requestOptions)
            .then(res=>res.json())
            .then(data=>{
                if(data.error)setError(data.error)
            })
            .catch(err=>{console.log(err)})
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            passwordnd: passwordnd,
        })
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            className="register-form"
            onSubmit={onsubmit}
        >
            <Typography variant="h2" gutterBottom>
                Sign Up
            </Typography>
            <TextField
                required
                id="outlined-required"
                label="Username"
                value={username}
                onChange={(event)=> {setUsername(event.target.value)}}
            />
            <TextField
                required
                id="outlined-required"
                label="Email"
                type="Email"
                value={email}
                onChange={(event)=> {setEmail(event.target.value)}}
            />
            <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event)=> {setPassword(event.target.value)}}
            />
            <TextField
                required
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                value={passwordnd}
                onChange={(event)=> {setPasswordnd(event.target.value)}}
                helperText={error}
            />
            <Button variant="contained" type="submit">Register</Button>
        </Box>
    )
}

