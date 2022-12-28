import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import "./loginForm.css"
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export default function LoginForm(){
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div className="login-form">
                <Typography variant="h2" gutterBottom>
                    Sign In
                </Typography>
                <TextField
                    id="outlined-required"
                    label="Username"
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
                <Button variant="contained">Login</Button>
            </div>
        </Box>
    )
}

