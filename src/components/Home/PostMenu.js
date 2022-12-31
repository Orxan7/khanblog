import * as React from 'react';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Edit from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import ReportIcon from '@mui/icons-material/Report';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { MoreHoriz } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../redux/actions';

export default function PostMenu({ id , user_id }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const handleDelete = () =>{
    setAnchorEl(null);

    const requestOptions = {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            post_id: id,
        })
    };
            
    fetch('/api/post/',requestOptions)
      .then(res=>res.json())
      .then((data)=>{
        if(data.message){
          dispatch(deletePost(id))
        }
      })
      .catch(err=>console.log(err))
    };

  return (
    <div>
    <MoreHoriz onClick={handleClick} style={{ cursor: "pointer" }}/>
      <Menu
        id="positioned-demo-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="positioned-demo-button"
        placement="bottom-end"
      >
        {auth.id===user_id? (
        <>
        <MenuItem onClick={handleClose}>
          <ListItemDecorator>
            <Edit />
          </ListItemDecorator>{' '}
          Edit post
        </MenuItem>
        <ListDivider />
        <MenuItem onClick={handleDelete} variant="soft" color="danger">
          <ListItemDecorator sx={{ color: 'inherit' }}>
            <DeleteForever />
          </ListItemDecorator>{' '}
          Delete
        </MenuItem>
        </>):
        (
          <>
          <MenuItem onClick={handleClose} variant="soft" color="danger">
            <ListItemDecorator>
            <ReportIcon />
            </ListItemDecorator>{' '}
            Report
          </MenuItem>
          <ListDivider />
          <MenuItem onClick={handleClose} >
            <ListItemDecorator sx={{ color: 'inherit' }}>
              <LinkIcon />
            </ListItemDecorator>{' '}
            Copy link
          </MenuItem>
          </>)
      }
      </Menu>
      
    </div>
  );
}