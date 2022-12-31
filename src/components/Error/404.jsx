import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Error404() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h1" sx={{textAlign: 'center'}} gutterBottom>
        Page not found
      </Typography>
    </Box>
  );
}