import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { AiOutlineHome } from 'react-icons/ai';

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="static" open={open}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box
            onClick={() => {
              navigate('/boards');
            }}
            sx={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              left: '20px',
            }}
          >
            <Typography variant="h5" noWrap component="div">
              <AiOutlineHome className="home-icon" />
            </Typography>
          </Box>
          <Typography component="h2" variant="h4" className="trello-main-logo">
            Trello
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
