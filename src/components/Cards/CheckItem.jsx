import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  FormControlLabel,
  Checkbox,
  Skeleton,
} from '@mui/material';

import updateCheckItem from '../../Functions/updateCheckItem';

import { ACTION as CHECKACTION } from '../../reducers/GetCheckedUnchecked';

import DeleteItem from '../common/DeleteItem';

// import useGetCheckItem from '../../Hooks/GetCheckItem';
import useGetCheckItem from '../../reducers/GetCheckItem';

import deleteCheckItem from '../../Functions/deleteCheckItem';

const CheckItem = ({
  checkStatusDispatch,
  cardId,
  checkItemsArrayDispatch,
  checkListId,
  checkItemId,
}) => {
  const { state: checkItemData, dispatch: checkItemDataDispatch } =
    useGetCheckItem(checkListId, checkItemId);

  const [checkedStatus, setCheckedStatus] = useState(true);

  useEffect(() => {
    checkItemData &&
      checkItemData.data.state &&
      setCheckedStatus(checkItemData.data.state === 'complete' ? true : false);
  }, [checkItemData]);

  const handleCheck = (isCheck) => {
    if (isCheck) {
      console.log('checked');
      updateCheckItem({
        checkItemsArrayDispatch,
        checkedStatus: isCheck,
        checkItemDataDispatch,
        cardId,
        checkItemId,
      });
      checkStatusDispatch(CHECKACTION.EDITCHECKITEM.CHECKED);
    } else {
      console.log('unchecked');
      updateCheckItem({
        checkItemsArrayDispatch,
        checkedStatus: isCheck,
        checkItemDataDispatch,
        cardId,
        checkItemId,
      });
      checkStatusDispatch(CHECKACTION.EDITCHECKITEM.UNCHECKED);
    }
  };

  if (checkItemData.loading) {
    return (
      <>
        <Skeleton animation="wave" variant="rectangular" width={'100%'} />
      </>
    );
  }

  if (checkItemData.error) {
    return (
      <>
        <>
          <Typography variant="h5" component="h3">
            Something went wrong...
          </Typography>
        </>
      </>
    );
  } else {
    return (
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => {
              setCheckedStatus(e.target.checked);
              handleCheck(e.target.checked);
            }}
            checked={checkedStatus}
          />
        }
        label={
          <div
            style={{
              width: '400px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="h5"
              component="h3"
              {...(checkedStatus
                ? { style: { textDecoration: 'line-through' } }
                : {})}
            >
              {checkItemData.data.name}
            </Typography>
            <DeleteItem
              deleteFunction={deleteCheckItem}
              deleteFunctionParams={{
                checkItemId,
                checkListId,
                checkItemsArrayDispatch,
                checkStatusDispatch,
              }}
              itemName={checkItemData.data.name}
            />
          </div>
        }
      />
    );
  }
};

export default CheckItem;
