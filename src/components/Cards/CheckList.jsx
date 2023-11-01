import React, { useEffect } from 'react';
import {
  Typography,
  Stack,
  Box,
  Paper,
  Skeleton,
  FormGroup,
  Card,
  CardContent,
} from '@mui/material';
import { FiCheckSquare } from 'react-icons/fi';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

import CheckItem from './CheckItem';
import DeleteItem from '../common/DeleteItem';
import AddItem from '../common/AddItem';

import useGetCheckItemsArray from '../../Hooks/GetCheckItemsArray';

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

const CheckList = ({
  checkListId,
  checkListName,
  cardId,
  cardCheckListsDispatch,
}) => {
  const { state: checkItemsArray, dispatch: checkItemsArrayDispatch } =
    useGetCheckItemsArray(checkListId);

  let numberOfCheckedItems = 0;
  let totalNumberOfItems = 0;

  let checkedItems = 0;
  checkItemsArray.data.forEach((item) => {
    if (item.state === 'complete') {
      checkedItems++;
    }
  });
  numberOfCheckedItems = checkedItems;

  totalNumberOfItems = checkItemsArray.data.length;
  console.log('totalNumberOfItems', totalNumberOfItems);
  console.log('numberOfCheckedItems', numberOfCheckedItems);

  if (checkItemsArray.loading) {
    return (
      <>
        <Card sx={{ marginY: '50px', backgroundColor: ' #F6FDC3' }}>
          <CardContent>
            <Stack
              direction="row"
              spacing={2}
              md={{ display: 'flex', justifyContent: 'space-between' }}
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
              marginTop={3}
              borderBottom={1}
            >
              <Stack spacing={2} direction="column">
                <Stack spacing={2} direction="row">
                  <Typography variant="h6" component="h2">
                    <FiCheckSquare />
                  </Typography>
                  <div id={checkListId}>
                    <Typography variant="h6" component="h2">
                      {checkListName}
                    </Typography>
                  </div>
                </Stack>
                <DeleteItem
                  deleteFunction={deleteCheckList}
                  deleteFunctionParams={{ checkListId, cardCheckListsDispatch }}
                  itemName={checkListName}
                />
                <Stack direction="column">
                  <FormGroup>
                    <Paper>
                      <Skeleton></Skeleton>
                    </Paper>
                  </FormGroup>
                  <Box sx={{ minWidth: '200px', width: '100%' }}>
                    <AddItem
                      addFunction={addCheckItem}
                      addFunctionParams={{
                        checkItemsArrayDispatch,
                        checkListId,
                      }}
                      itemName={'CheckItem'}
                    />
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </>
    );
  }
  if (checkItemsArray.error) {
    return (
      <>
        <Card sx={{ marginY: '50px', backgroundColor: ' #F6FDC3' }}>
          <CardContent>
            <Stack
              direction="row"
              spacing={2}
              md={{ display: 'flex', justifyContent: 'space-between' }}
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
              marginTop={3}
              borderBottom={1}
            >
              <Stack spacing={2} direction="column">
                <Stack spacing={2} direction="row">
                  <Typography variant="h6" component="h2">
                    <FiCheckSquare />
                  </Typography>
                  <div>
                    <Typography variant="h6" component="h2">
                      {checkListName}
                    </Typography>
                  </div>
                </Stack>
                <DeleteItem />
                <Stack direction="column">
                  <FormGroup>
                    <Paper>
                      <Typography variant="h6" color="error">
                        {checkItemsArray.error.length > 0 ? (
                          <div>{checkItemsArray.error}</div>
                        ) : (
                          <div>false</div>
                        )}
                        {/* error... */}
                      </Typography>
                    </Paper>
                  </FormGroup>
                  <Box sx={{ minWidth: '200px', width: '100%' }}>
                    <AddItem
                      addFunction={addCheckItem}
                      addFunctionParams={{
                        checkItemsArrayDispatch,
                        checkListId,
                      }}
                      itemName={'CheckItem'}
                    />
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <Card sx={{ marginY: '50px', backgroundColor: ' #F6FDC3' }}>
          <CardContent>
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
                  <div id={checkListId}>
                    <Typography variant="h6" component="h2">
                      {checkListName}
                    </Typography>
                  </div>
                </Stack>
                <DeleteItem
                  deleteFunction={deleteCheckList}
                  deleteFunctionParams={{ checkListId, cardCheckListsDispatch }}
                  itemName={checkListName}
                />
                <Stack direction="column">
                  {numberOfCheckedItems > 0 && (
                    <BorderLinearProgress
                      variant="determinate"
                      value={(numberOfCheckedItems / totalNumberOfItems) * 100}
                    />
                  )}
                  <FormGroup>
                    {checkItemsArray.data &&
                      checkItemsArray.data.map((item) => {
                        return (
                          <>
                            <CheckItem
                              key={item.id}
                              itemName={item.name}
                              itemState={item.state}
                              cardId={cardId}
                              checkItemsArrayDispatch={checkItemsArrayDispatch}
                              checkListId={checkListId}
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
                        checkItemsArrayDispatch,
                        checkListId,
                      }}
                      itemName={'CheckItem'}
                    />
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </>
    );
  }
};

export default CheckList;
