import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchBoard } from '../../features/boards/boardSlice';
import { fetchLists } from '../../features/lists/listsSlice';

import {
  styled,
  Container,
  Box,
  Typography,
  Grid,
  Stack,
  Skeleton,
  Button,
  Card,
  CardContent,
  Paper,
} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

import useGetList from '../../Hooks/GetLists';

import List from './List';
import AddItem from '../common/AddItem';

import addList from '../../Functions/addList';

// import useGetboardView from '../../Hooks/GetboardView';

const style = {
  marginTop: '-50px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  padding: '50px 100px',
  backgroundColor: 'transparent',
  width: '100vw',
  minHeight: '100vh',
};

const BoardView = ({ id }) => {
  // const { boardView } = useGetboardView(id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoard(id));
  }, []);

  const boardView = useSelector((state) => {
    return state.board.data;
  });

  // const { board, setBoard, loading, error } = useGetList(id);

  const setBoard = 'as';
  useEffect(() => {
    dispatch(fetchLists(id));
  }, []);

  const board = useSelector((state) => {
    return state.lists.data;
  });
  const loading = useSelector((state) => {
    return state.lists.loading;
  });
  const error = useSelector((state) => {
    return state.lists.error;
  });

  const navigate = useNavigate();

  if (loading) {
    return (
      <>
        <Container>
          <Stack
            spacing={2}
            display="flex"
            direction="row"
            flexWrap="wrap"
            marginY={4}
          >
            <Stack
              marginTop={3}
              gap={5}
              direction={'row'}
              overflow="scroll"
              height={'80vh'}
            >
              <Box width="auto" minWidth={300} maxWidth={500} minHeight={400}>
                <Card
                  sx={{
                    height: '400px',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <CardContent>
                    <Skeleton height={50}></Skeleton>
                    <Skeleton height={300}></Skeleton>
                  </CardContent>
                </Card>
              </Box>
              <Box width="auto" minWidth={300} maxWidth={500} minHeight={400}>
                <Card
                  sx={{
                    height: '400px',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <CardContent>
                    <Skeleton height={50}></Skeleton>
                    <Skeleton height={300}></Skeleton>
                  </CardContent>
                </Card>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Container>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            marginTop={3}
          >
            <Grid item xs={12}>
              <Item>
                <Typography variant="h3" component="h1">
                  An error occured, please try again later.
                </Typography>
                <Box height={50}></Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate('/boards');
                  }}
                >
                  Go to Home Page!
                </Button>
              </Item>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <div
          style={
            !boardView.prefs
              ? { ...style }
              : !boardView.prefs.backgroundImage
              ? !boardView.prefs.backgroundColor
                ? { ...style, backgroundColor: 'transparent' }
                : {
                    ...style,
                    backgroundColor: boardView.prefs.backgroundColor,
                  }
              : {
                  ...style,
                  backgroundImage: `url(${boardView.prefs.backgroundImage})`,
                }
          }
        >
          <Stack
            spacing={2}
            display="flex"
            direction="row"
            flexWrap="wrap"
            marginY={4}
          >
            <Stack
              marginTop={3}
              gap={5}
              direction={'row'}
              overflow="scroll"
              height={'80vh'}
            >
              {board.map((list) => {
                return (
                  <List
                    key={list.id}
                    listId={list.id}
                    listName={list.name}
                    setBoard={setBoard}
                    board={board}
                  />
                );
              })}

              <Box width="auto" minWidth={300} maxWidth={500} paddingX={4}>
                <AddItem
                  addFunction={addList}
                  addFunctionParams={{ setBoard, boardId: id }}
                  itemName={'List'}
                />
              </Box>
            </Stack>
          </Stack>
        </div>
      </>
    );
  }
};

export default BoardView;
