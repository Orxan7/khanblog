import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import { CssVarsProvider } from "@mui/joy/styles";
import { Typography } from '@mui/material';
import { addPost } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function CreatePost() {
    
  const [value, setValue] = React.useState("");
  const [message, setMessage] = React.useState("")

  const dispatch = useDispatch()

  const handleSubmit = (e)=>{
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
              text: value,
          })
  };

    fetch('/post/', requestOptions)
      .then(async (res)=>({
        data: await res.json(),
        status: res.ok
      }))
      .then((data)=>{
        console.log(data)
        if(data.status){
          dispatch(addPost({
            username: data.data.username,
            createdAt: data.data.created,
            post_id: data.data.post_id,
            text: data.data.text
          }))
          setValue("")
          setMessage(data.data.status)
        }
        else
        {
          setMessage(data.data.message)
        }
      })
      .catch(error=>{
        console.log(error)
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
                <Button sx={{ ml: 'auto', }} type="submit">Publish</Button>
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
