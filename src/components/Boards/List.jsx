import React from 'react';
import axios from 'axios';

import { Box, Stack, Card, CardContent, Typography } from '@mui/material';
import { BiArchiveIn } from 'react-icons/bi';

import ListCards from './ListCards';

const List = ({ listId, listName, setBoard, board }) => {
  const archiveList = (listId) => {
    axios({
      method: 'PUT',
      url: `https://api.trello.com/1/lists/${listId}/closed`,
      params: {
        value: true,
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
      },
    })
      .then((res) => {
        //console.log('archive list', res.data);
        setBoard(() => board.filter((list) => list.id !== listId));
      })
      .catch((err) => {
        console.log('error in archieving list ', err);
      });
  };

  return (
    <>
      <Box width="auto" minWidth={300} maxWidth={500}>
        <Card
          sx={{
            backgroundColor: '#f5f5f5',
          }}
        >
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Typography component="h2" variant="h6" marginBottom={2}>
                {listName}
              </Typography>
              <Typography component="h2" variant="h6" marginBottom={2}>
                <BiArchiveIn
                  onClick={() => {
                    archiveList(listId);
                  }}
                />
              </Typography>
            </Stack>
            <Stack direction={'column'} spacing={3}>
              <ListCards listId={listId} />
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default List;
