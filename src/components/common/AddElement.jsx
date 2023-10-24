import React from 'react';

import axios from 'axios';

import { Box, Stack, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import usePostBoard from '../../Hooks/PostBoard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AddElement = ({ setBoards }) => {
  const [listValue, setListValue] = React.useState('');
  const PostBoard = usePostBoard();

  const addValue = () => {
    const lastUrl = `key=537b641d27415d26a221d4f9cd736b2e&token=ATTA2aded428541342740a1e740389d73a90e8b6b943e5c1cbdf04788548355d5801612FEE20`;

    if (listValue) {
      axios({
        method: 'POST',
        // url: `https://api.trello.com/1/members/me/boards?${lastUrl}`,
        url: `https://api.trello.com/1/boards/?name=${listValue}&${lastUrl}`,
      })
        .then((res) => {
          console.log('from add board', res.data);
          setBoards((prev) => [...prev, res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // listValue ? PostBoard(listValue, setBoards) : null;
    setListValue('');
  };

  return (
    <>
      <Box
        sx={{
          width: 'auto',
          height: 100,
        }}
      >
        <Item
          sx={{
            display: 'absolute',
            bottom: 0,
          }}
        >
          <Stack spacing={2} direction="row">
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              value={listValue}
              onChange={(e) => setListValue(e.target.value)}
            />
            <Button
              endIcon={<AddIcon />}
              variant="contained"
              size="small"
              onClick={() => {
                addValue();
              }}
            >
              Add
            </Button>
          </Stack>
        </Item>
      </Box>
    </>
  );
};

export default AddElement;
