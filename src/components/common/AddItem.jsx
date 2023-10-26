import React, { useState } from 'react';

import axios from 'axios';

import { Box, Stack, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { Block } from '@mui/icons-material';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AddItem = ({ addFunction, addFunctionParams, itemName }) => {
  const [itemValue, setItemValue] = React.useState('');
  const [open, setOpen] = useState(false);

  const addValue = () => {
    if (itemValue) {
      console.log('addFunction initiated', itemValue);
      addFunction({ ...addFunctionParams, value: itemValue });
      setOpen(false);
      setItemValue('');
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleopen = () => {
    setOpen(true);
  };
  return (
    <>
      <ClickAwayListener onClickAway={handleClose}>
        <Box
          sx={{
            width: '100%',
            height: 120,
            position: 'relative',
          }}
        >
          <Paper
            sx={
              !open
                ? {
                    //   display: 'Block',
                    height: '50px',
                    width: '100%',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 0,
                  }
                : { display: 'none' }
            }
            onClick={() => {
              handleopen();
            }}
            onFocus={handleopen}
          >
            <Stack
              spacing={1}
              direction="row"
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              <Typography variant="subtitle2" component="p">
                {`Add ${itemName}`}
              </Typography>
              <Typography variant="subtitle2" component="p">
                <AddIcon />
              </Typography>
            </Stack>
          </Paper>

          <Paper
            sx={
              open
                ? {
                    display: 'block',
                    padding: '10px',
                    position: 'absolute',
                    bottom: 0,
                  }
                : { display: 'none' }
            }
          >
            <Stack spacing={2} direction="row">
              <FormControl>
                <InputLabel htmlFor="my-input">{itemName}</InputLabel>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  value={itemValue}
                  onChange={(e) => setItemValue(e.target.value)}
                />
              </FormControl>
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
          </Paper>
        </Box>
      </ClickAwayListener>
    </>
  );
};

export default AddItem;
