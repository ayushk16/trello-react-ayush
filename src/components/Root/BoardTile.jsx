import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, styled, Paper, Box, Skeleton } from '@mui/material';

import useGetBoardTile from '../../Hooks/GetBoardTile';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
  width: 'auto',
  height: 300,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'primary.dark',
  backgroundPosition: 'center',
  borderRadius: '10px',
  '&:hover': {
    opacity: [0.9, 0.8, 0.7],
  },
};

const BoardTile = ({ id }) => {
  const { boardTile, loading, error } = useGetBoardTile(id);
  // console.log('from boardTile', boardTile);
  const navigate = useNavigate();
  if (loading) {
    return (
      <>
        <Grid width={'auto'} item xs={12} sm={6} md={4} lg={3}>
          <Box sx={{ width: 'auto' }}>
            <Skeleton width={250} />
            <Skeleton
              variant="rectangular"
              height={300}
              width={250}
              animation="wave"
            />
            <Skeleton width={250} animation={false} />
          </Box>
        </Grid>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box sx={style}>
            <Item>
              <div>Board Not Found</div>
            </Item>
          </Box>
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          onClick={() => navigate(`/boards/${id}`)}
          marginTop={2}
        >
          <Box
            sx={
              !boardTile.prefs
                ? { ...style }
                : !boardTile.prefs.backgroundImage
                ? !boardTile.prefs.backgroundColor
                  ? { ...style, backgroundColor: 'primary.dark' }
                  : {
                      ...style,
                      backgroundColor: boardTile.prefs.backgroundColor,
                    }
                : {
                    ...style,
                    backgroundImage: `url(${boardTile.prefs.backgroundImage})`,
                  }
            }
          >
            <Item>
              <Typography variant="h6" component="h2">
                {boardTile.name}
              </Typography>
            </Item>
          </Box>
        </Grid>
      </>
    );
  }
};

export default BoardTile;
