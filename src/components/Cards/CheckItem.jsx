import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  FormControlLabel,
  Checkbox,
  Skeleton,
} from '@mui/material';

import updateCheckItem from '../../Functions/updateCheckItem';

import DeleteItem from '../common/DeleteItem';

// import useGetCheckItem from '../../Hooks/GetCheckItem';
import deleteCheckItem from '../../Functions/deleteCheckItem';

const CheckItem = ({
  itemName,
  itemState,
  cardId,
  checkItemsArrayDispatch,
  checkListId,
  checkItemId,
}) => {
  // const { state: checkItemData, dispatch: checkItemDataDispatch } =
  //   useGetCheckItem(checkListId, checkItemId);

  const [checkedStatus, setCheckedStatus] = useState(true);

  useEffect(() => {
    itemState && setCheckedStatus(itemState === 'complete' ? true : false);
  }, []);

  const handleCheck = (isCheck) => {
    if (isCheck) {
      console.log('checked');
      updateCheckItem({
        checkItemsArrayDispatch,
        checkedStatus: isCheck,
        cardId,
        checkItemId,
      });
    } else {
      console.log('unchecked');
      updateCheckItem({
        checkItemsArrayDispatch,
        checkedStatus: isCheck,
        cardId,
        checkItemId,
      });
    }
  };

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
            {itemName}
          </Typography>
          <DeleteItem
            deleteFunction={deleteCheckItem}
            deleteFunctionParams={{
              checkItemId,
              checkListId,
              checkItemsArrayDispatch,
            }}
            itemName={itemName}
          />
        </div>
      }
    />
  );
};

export default CheckItem;
