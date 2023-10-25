import React, { useState } from 'react';
import { Typography, Stack } from '@mui/material';
import { FiCheckSquare } from 'react-icons/fi';
import useGetChecklists from '../../Hooks/GetCheckLists';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import useGetChecklist from '../../Hooks/GetCheckList';
import CheckItem from './CheckItem';
import AddCheckListItem from '../common/AddCheckListItem';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckList = ({ checklistId }) => {
  const { checkListData, setCheckListData, loading, error } =
    useGetChecklist(checklistId);
  console.log('from cheklsit', checkListData);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(checkListData.name);

  const handleClick = () => {
    setIsEditing(true);
    document.getElementById(checkListData.id).firstElementChild.focus();
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    setText(checkListData.name);
  };
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        marginTop={3}
      >
        <Stack spacing={2} direction="column">
          <Stack spacing={2} direction="row">
            <Typography variant="h6" component="h2">
              <FiCheckSquare />
            </Typography>
            <div id={checkListData.id}>
              {isEditing ? (
                <TextField
                  variant="standard"
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  //   onBlurCapture={handleInputBlur}
                  placeholder={checkListData.name}
                  value={text}
                />
              ) : (
                <Typography variant="h6" component="h2" onClick={handleClick}>
                  {checkListData.name}
                </Typography>
              )}
            </div>
          </Stack>
          <Stack direction="column">
            <FormGroup>
              {checkListData['checkItems'] &&
                checkListData['checkItems'].map((item) => {
                  return (
                    <>
                      <CheckItem
                        checkListId={checklistId}
                        checkItemId={item.id}
                      />
                    </>
                  );
                })}
            </FormGroup>
            <AddCheckListItem
              checkListId={checklistId}
              setCheckListData={setCheckListData}
            />
          </Stack>
        </Stack>
        <Button
          variant="contained"
          size="small"
          startIcon={<DeleteIcon />}
          sx={{
            backgroundColor: 'grey',
            justifySelf: 'flex-end',
            height: 'fit-content',
          }}
        >
          Delete
        </Button>
      </Stack>
      <Button variant="contained" size="small" marginLeft={5}>
        Add an item
      </Button>
    </>
  );
};

export default CheckList;
