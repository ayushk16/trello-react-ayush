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

const AddElement = ({ checkListId, setCheckListData }) => {
  const [checkItemValue, setCheckItemValue] = React.useState('');

  const addValue = () => {
    if (checkItemValue) {
      axios({
        method: 'POST',
        url: `https://api.trello.com/1/cards/{id}/checklists`,
        params: {
          name: checkItemValue,
          key: import.meta.env.VITE_API_KEY,
          token: import.meta.env.VITE_TOKEN,
        },
      })
        .then((res) => {
          //console.log('from add checkitem', res.data);
          setCheckListData((prev) => ({
            ...prev,
            checkItems: [...prev.checkItems, res.data],
          }));
        })
        .catch((err) => {
          //console.log(err);
        });
    }

    setCheckItemValue('');
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
              value={checkItemValue}
              onChange={(e) => setCheckItemValue(e.target.value)}
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
