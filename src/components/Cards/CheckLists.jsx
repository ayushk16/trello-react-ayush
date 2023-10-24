import React from 'react';
import { Typography, Stack } from '@mui/material';
import { FaCreditCard } from 'react-icons/fa';
import useGetChecklists from '../../Hooks/GetCheckLists';
const CheckLists = ({ cardId }) => {
  const { cardChecklists, setCheckLists, loading, error } =
    useGetChecklists(cardId);
  console.log('from cheklsit', cardChecklists);

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Typography variant="h4" component="h2">
          <FaCreditCard />
        </Typography>
        <Typography variant="h4" component="h2"></Typography>
      </Stack>
    </>
  );
};

export default CheckLists;
