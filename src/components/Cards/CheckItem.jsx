import React from 'react';
import useGetCheckItem from '../../Hooks/GetCheckItem';
import { Typography } from '@mui/material';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckItem = ({ checkListId, checkItemId }) => {
  const { checkItemData, setCheckItemData, loading, error } = useGetCheckItem(
    checkListId,
    checkItemId
  );

  console.log('from chekitem', checkItemData);

  return (
    <FormControlLabel
      control={
        checkItemData.state === 'complete' ? (
          <Checkbox defaultChecked />
        ) : (
          <Checkbox />
        )
      }
      label={checkItemData.name}
    />
  );
};

export default CheckItem;
