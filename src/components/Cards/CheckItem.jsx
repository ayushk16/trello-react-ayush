import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useGetCheckItem from '../../Hooks/GetCheckItem';
import { Button, Typography } from '@mui/material';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { Delete } from '@mui/icons-material';
import DeleteItem from '../common/DeleteItem';
import deleteCheckItem from '../../Functions/deleteCheckItem';

const CheckItem = ({
  setNumberOfCheckedItems,
  cardId,
  setCheckItemsArray,
  checkListId,
  checkItemId,
}) => {
  const { checkItemData, setCheckItemData, loading, error } = useGetCheckItem(
    checkListId,
    checkItemId
  );
  const [checkedStatus, setCheckedStatus] = useState(false);

  useEffect(() => {
    setCheckedStatus(checkItemData.state == 'complete');
    console.log(checkItemData.name, checkItemData.state);
  }, [checkItemData]);

  useEffect(() => {
    axios({
      method: 'PUT',
      url: `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}`,
      params: {
        state: checkedStatus ? 'complete' : 'incomplete',
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
      },
    });
  }, [checkedStatus]);

  const handleCheck = () => {
    if (checkedStatus) {
      setNumberOfCheckedItems((prev) => prev - 1);
    } else {
      setNumberOfCheckedItems((prev) => prev + 1);
    }
  };
  // console.log('from chekitem', checkItemData.name, checkItemData.state);

  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={(e) => {
            console.log(e.target.checked);
            setCheckedStatus(e.target.checked);
            handleCheck();
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
            {checkItemData.name}
          </Typography>
          <Button color="error" onClick={() => {}}>
            <DeleteItem
              deleteFunction={deleteCheckItem}
              deleteFunctionParams={{
                checkItemId,
                checkListId,
                setCheckItemsArray,
              }}
              itemName={checkItemData.name}
            />
          </Button>
        </div>
      }
    />
  );
};

export default CheckItem;
