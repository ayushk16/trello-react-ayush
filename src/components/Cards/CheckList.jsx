import React, { useEffect, useState } from 'react';
import { Typography, Stack, Box } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import { FiCheckSquare } from 'react-icons/fi';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

import useGetChecklist from '../../Hooks/GetCheckList';
import useGetCheckItemsArray from '../../Hooks/GetCheckItemsArray';

import CheckItem from './CheckItem';
import DeleteItem from '../common/DeleteItem';
import AddItem from '../common/AddItem';

import deleteCheckList from '../../Functions/deleteCheckList';
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

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        md={{ display: 'flex', justifyContent: 'space-between' }}
        sx={{ display: 'flex', justifyContent: 'flex-start' }}
        marginTop={3}
      >
        <Stack spacing={2} direction="column">
          <Stack spacing={2} direction="row">
            <Typography variant="h6" component="h2">
              <FiCheckSquare />
            </Typography>
            <div id={checkListData.id}>
              <Typography variant="h6" component="h2">
                {checkListData.name}
              </Typography>
            </div>
          </Stack>
          <DeleteItem
            deleteFunction={deleteCheckList}
            deleteFunctionParams={{ checklistId, setCardCheckLists }}
            itemName={checkListData.name}
          />
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
            <Box sx={{ minWidth: '200px', width: '100%' }}>
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
      </Stack>
    </>
  );
};

export default CheckList;
