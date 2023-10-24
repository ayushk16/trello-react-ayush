import React from 'react';
import {
  Container,
  Box,
  Stack,
  Card,
  CardContent,
  Paper,
  Typography,
} from '@mui/material';
import AddCard from '../common/AddCard';
import axios from 'axios';
import { BiArchiveIn } from 'react-icons/bi';
import ListCards from './ListCards';

const List = ({ listId, listName, setBoard, board }) => {
  const archiveList = (listId) => {
    const lastUrl = `key=537b641d27415d26a221d4f9cd736b2e&token=ATTA2aded428541342740a1e740389d73a90e8b6b943e5c1cbdf04788548355d5801612FEE20`;
    console.log('archiveList', listId);
    axios({
      method: 'PUT',
      url: `https://api.trello.com/1/lists/${listId}/closed`,
      params: {
        value: true,
        key: '537b641d27415d26a221d4f9cd736b2e',
        token:
          'ATTA2aded428541342740a1e740389d73a90e8b6b943e5c1cbdf04788548355d5801612FEE20',
      },
    })
      .then((res) => {
        console.log('archive list', res.data);
        setBoard(() => board.filter((list) => list.id !== listId));
      })
      .catch((err) => {
        console.log(err);
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
                    console.log(listId);
                    archiveList(listId);
                  }}
                />
              </Typography>
            </Stack>
            <ListCards listId={listId} setBoard={setBoard} />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default List;
