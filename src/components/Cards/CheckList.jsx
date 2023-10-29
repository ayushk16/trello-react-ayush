import React from 'react';
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

// import useGetChecklist from '../../Hooks/GetCheckList';
// import useGetCheckItemsArray from '../../Hooks/GetCheckItemsArray';
import useGetCheckItemsArray from '../../reducers/GetCheckItemsArray';

import deleteCheckList from '../../Functions/deleteCheckList';
import addCheckItem from '../../Functions/addCheckItem';
import useGetCheckedUnchecked from '../../reducers/GetCheckedUnchecked';

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
  const { state: checkItemsStatus, dispatch: checkStatusDispatch } =
    useGetCheckedUnchecked(checkItemsArray);

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
                        checkStatusDispatch,
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
                <DeleteItem
                  deleteFunction={deleteCheckList}
                  deleteFunctionParams={{ checkListId, cardCheckListsDispatch }}
                  itemName={checkListName}
                />
                <Stack direction="column">
                  <FormGroup>
                    <Paper>
                      <Typography variant="h6" color="error">
                        {checkItemsArray.error.length > 0 ? (
                          <div>{checkItemsArray.error}</div>
                        ) : (
                          <div>flase</div>
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
                        checkStatusDispatch,
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
                  {/* <ProgressBar></ProgressBar> */}
                  {checkItemsStatus &&
                    checkItemsStatus.totalNumberOfItems > 0 && (
                      <BorderLinearProgress
                        variant="determinate"
                        value={
                          (checkItemsStatus.numberOfCheckedItems /
                            checkItemsStatus.totalNumberOfItems) *
                          100
                        }
                      />
                    )}
                  <FormGroup>
                    {checkItemsArray.data &&
                      checkItemsArray.data.map((item) => {
                        return (
                          <>
                            <CheckItem
                              key={item.id}
                              checkStatusDispatch={checkStatusDispatch}
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
                        checkStatusDispatch,
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
