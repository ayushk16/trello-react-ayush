import {
  Container,
  Box,
  Stack,
  Card,
  CardContent,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import List from './List';
import useGetList from '../../Hooks/GetLists';
import AddItem from '../common/AddItem';
import addList from '../../Functions/addList';
const BoardView = ({ id }) => {
  const { board, setBoard, loading, error } = useGetList(id);
  // //console.log('from boards view', board);

  if (loading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div>error...</div>
      </>
    );
  } else {
    return (
      <>
        {/* <div>
          {board.map((list) => {
            return <div>{list.name}</div>;
          })}
        </div> */}
        <Container>
          <Stack
            spacing={2}
            direction="row"
            display="flex"
            flexWrap="wrap"
            marginY={4}
          >
            <Stack marginTop={3} gap={5} direction="row" overflow="scroll">
              {board.map((list) => {
                return (
                  <>
                    <List
                      listId={list.id}
                      listName={list.name}
                      setBoard={setBoard}
                      board={board}
                    />
                  </>
                );
              })}

              {/* <Box>
              <Card
                sx={{
                  backgroundColor: '#f5f5f5',
                }}
              >
                <CardContent>
                  <Paper elevation={4}>
                    <h1>Board View</h1>
                  </Paper>
                </CardContent>
              </Card>
            </Box> */}
            </Stack>
            <AddItem
              addFunction={addList}
              addFunctionParams={{ setBoard, boardId: id }}
              itemName={'List'}
            />
          </Stack>
        </Container>
      </>
    );
  }
};

export default BoardView;
