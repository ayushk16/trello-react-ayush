import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AddElement from '../common/AddElement';
import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import useGetHome from '../../Hooks/GetHome';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import BoardTile from './BoardTile';
import Stack from '@mui/material/Stack';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const BoardsContainer = () => {
  const { boards, setBoards, loading, error } = useGetHome();
  // //console.log('from boardsContainer', boards);

  if (loading) {
    return (
      <Container>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          marginTop={3}
        >
          {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
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
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return <div>Error...</div>;
  } else {
    return (
      <>
        <Container>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            marginTop={3}
          >
            {boards.map((item) => {
              return <BoardTile id={item.id} />;
            })}
            <Grid item xs={3}>
              <AddElement setBoards={setBoards} />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
};

export default BoardsContainer;
