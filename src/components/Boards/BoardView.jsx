import React from 'react';

import { Container, Box, Stack } from '@mui/material';

import useGetList from '../../Hooks/GetLists';

import List from './List';
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

              <Box width="auto" minWidth={300} maxWidth={500} paddingX={4}>
                <AddItem
                  addFunction={addList}
                  addFunctionParams={{ setBoard, boardId: id }}
                  itemName={'List'}
                />
              </Box>
            </Stack>
          </Stack>
        </Container>
      </>
    );
  }
};

export default BoardView;
