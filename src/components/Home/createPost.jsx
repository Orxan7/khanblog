import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import { CssVarsProvider } from "@mui/joy/styles";
import { Typography } from '@mui/material';

export default function CreatePost() {
    
  const [value, setValue] = React.useState("");
  const [message, setMessage] = React.useState("")

  const handleSubmit = (e)=>{
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
              text: value,
          })
  };

    fetch('/post/', requestOptions)
      .then((res)=>res.json())
      .then(data=>{
        setMessage(data.message)
      })
  } 

  return (
    <CssVarsProvider>
        <form action="/" method='POST' onSubmit={handleSubmit}>
        <Textarea
            placeholder="What do you think?"
            value={value}
            onChange={event=>setValue(event.target.value)}
            minRows={3}
            endDecorator={
            <Box
                sx={{
                display: 'flex',
                gap: 'var(--Textarea-paddingBlock)',
                pt: 'var(--Textarea-paddingBlock)',
                borderTop: '1px solid',
                borderColor: 'divider',
                flex: 'auto',
                }}
            >
                <Typography level="body1" color={message.includes('3')?"red":"green"} marginTop="4px">
                  {message} 
                </Typography>
                <Button sx={{ ml: 'auto', }} type="submit">Send</Button>
            </Box>
            }
            sx={{
            minWidth: 300,
            marginTop: 5,
            marginLeft: "20%",
            marginRight: "20%",
            }}
        />
        </form>
    </CssVarsProvider>
  );
}
