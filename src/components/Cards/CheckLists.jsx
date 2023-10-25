import React from 'react';
import { Typography, Stack } from '@mui/material';
import { FiCheckSquare } from 'react-icons/fi';
import useGetChecklists from '../../Hooks/GetCheckLists';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
const CheckLists = ({ cardId }) => {
  const { cardCheckLists, setCardCheckLists, loading, error } =
    useGetChecklists(cardId);
  console.log('from cheklsit', cardCheckLists);

  return (
    <>
      {cardCheckLists.map((checklist) => {
        return (
          <>
            <Stack
              direction="row"
              spacing={2}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
              marginTop={3}
            >
              <Stack spacing={2} direction="row">
                <Typography variant="h6" component="h2">
                  <FiCheckSquare />
                </Typography>
                <Typography variant="h6" component="h2">
                  {/* <TextField
                    variant="standard"
                    value={checklist.name}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                    id="margin-normal"
                    margin="normal"
                    co  lor="primary"
                    focused
                  /> */}

                  <Input
                    variant="standard"
                    value={checklist.name}
                    placeholder={checklist.name}
                    inputProps={{ 'aria-label': 'cardname' }}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                  {/* {checklist.name} */}
                </Typography>
              </Stack>
              <Button
                variant="contained"
                size="small"
                startIcon={<DeleteIcon />}
                sx={{ backgroundColor: 'grey', justifySelf: 'flex-end' }}
              >
                Delete
              </Button>
            </Stack>
            <Button variant="contained" size="small" marginLeft={5}>
              Add an item
            </Button>
          </>
        );
      })}
    </>
  );
};

export default CheckLists;
