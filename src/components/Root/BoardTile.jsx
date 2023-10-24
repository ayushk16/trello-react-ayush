import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import useGetBoardTile from '../../Hooks/GetBoardTile';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const BoardTile = ({ id }) => {
  const { boardTile, loading, error } = useGetBoardTile(id);
  console.log('from boardTile', boardTile);
  const navigate = useNavigate();
  if (loading) {
    return (
      <>
        <Grid item xs={3}>
          <Box sx={{ width: 300 }}>
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
        <Grid item xs={3}>
          <Box
            sx={{
              width: 'auto',
              height: 300,
              // backgroundImage: {
              //   boardTile["prefs"] ? (`url(${boardTile.prefs.backgroundImageScaled['0'].url})`) :  `url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/67x100/2f18f8671481046a2aa1955e7388891a/photo-1695056721201-078a656ef90b.jpg)`
              // },
              // backgroundImage: `url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/67x100/2f18f8671481046a2aa1955e7388891a/photo-1695056721201-078a656ef90b.jpg)`,
              backgroundColor: boardTile.prefs.backgroundColor,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              // backgroundColor: 'primary.dark',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
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
          xs={3}
          onClick={() => navigate(`/boards/${id}`)}
          marginTop={2}
        >
          <Box
            sx={{
              width: 'auto',
              height: 300,
              // backgroundImage: boardTile.prefs.backgroundImage
              //   ? `url(${boardTile.prefs.backgroundImage})`
              //   : `url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/67x100/2f18f8671481046a2aa1955e7388891a/photo-1695056721201-078a656ef90b.jpg)`,
              // // backgroundImage: `url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/67x100/2f18f8671481046a2aa1955e7388891a/photo-1695056721201-078a656ef90b.jpg)`,
              // backgroundColor: boardTile.prefs.backgroundColor
              //   ? boardTile.prefs.backgroundColor
              //   : 'primary.dark',
              backgroundColor: 'primary.dark',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Item>
              <div
              //   style={{
              //     backgroundImage: `url(${boardTile.prefs.backgroundImageScaled['0'].url})`,
              //   }}
              >
                {boardTile.name}
              </div>
            </Item>
          </Box>
        </Grid>
      </>
    );
  }
};

export default BoardTile;
