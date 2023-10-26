import React, { useEffect, useState } from 'react';
import { Typography, Stack, Box } from '@mui/material';
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
import useGetCheckItemsArray from '../../Hooks/GetCheckItemsArray';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

import DeleteItem from '../common/DeleteItem';
import deleteCheckList from '../../Functions/deleteCheckList';

import { styled } from '@mui/material/styles';
import AddItem from '../common/AddItem';
import addCheckItem from '../../Functions/addCheckItem';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const CheckList = ({ checklistId, setCardCheckLists }) => {
  const { checkListData, setCheckListData, loading, error } =
    useGetChecklist(checklistId);
  //console.log('from cheklsit', checkListData);
  const { checkItemsArray, setCheckItemsArray } =
    useGetCheckItemsArray(checklistId);
  //console.log('checkithm', checkItemsArray);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(checkListData.name);

  const [numberOfCheckedItems, setNumberOfCheckedItems] = useState(0);
  const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);

  useEffect(() => {
    console.log('checkItemsArray', checkItemsArray.length);

    let checkedItems = 0;
    checkItemsArray.forEach((item) => {
      if (item.state == 'complete') {
        //console.log(item);
        checkedItems++;
      }
    });
    setTotalNumberOfItems(checkItemsArray.length);
    setNumberOfCheckedItems(checkedItems);
    console.log('checkedItems', checkedItems);
  }, [checkItemsArray]);
  //console.log('total number of items', totalNumberOfItems);
  //console.log('number of checked items', numberOfCheckedItems);

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
            {totalNumberOfItems > 0 && (
              <BorderLinearProgress
                variant="determinate"
                value={(numberOfCheckedItems / totalNumberOfItems) * 100}
              />
            )}
            <FormGroup>
              {checkItemsArray &&
                checkItemsArray.map((item) => {
                  return (
                    <>
                      <CheckItem
                        setTotalNumberOfItems={setTotalNumberOfItems}
                        setNumberOfCheckedItems={setNumberOfCheckedItems}
                        cardId={checkListData.idCard}
                        setCheckItemsArray={setCheckItemsArray}
                        checkListId={checklistId}
                        checkItemId={item.id}
                      />
                    </>
                  );
                })}
            </FormGroup>
            <Box sx={{ width: '100%' }}>
              <AddItem
                addFunction={addCheckItem}
                addFunctionParams={{
                  setCheckItemsArray,
                  setTotalNumberOfItems,
                  checklistId,
                }}
                itemName={'CheckItem'}
              />
            </Box>
          </Stack>
        </Stack>
        <DeleteItem
          deleteFunction={deleteCheckList}
          deleteFunctionParams={{ checklistId, setCardCheckLists }}
          itemName={checkListData.name}
        />
      </Stack>
    </>
  );
};

export default CheckList;
