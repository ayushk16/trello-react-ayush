import React from 'react';

import {
  Box,
  Button,
  Typography,
  Skeleton,
  Divider,
  Grid,
  Stack,
} from '@mui/material';
import { RxCross2 } from 'react-icons/rx';
import { FaCreditCard } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { grey, red } from '@mui/material/colors';
import Slide from '@mui/material/Slide';

import deleteCard from '../../Functions/deleteCard';

import CheckList from './CheckList';
import AddCheckList from './AddCheckList';

import useGetChecklists from '../../Hooks/GetCheckLists';
import useGetCardDetails from '../../Hooks/GetCardDetails';

const color = red[500];

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CardDetails = ({ cardId, handleClose, handleOpen, setCards }) => {
  const { cardDetails, setCardDetails, loading, error } =
    useGetCardDetails(cardId);

  const {
    cardCheckLists,
    setCardCheckLists,
    loading: aloading,
    error: aerror,
  } = useGetChecklists(cardId);

  let a = cardCheckLists;
  if (loading) {
    return (
      <>
        <Box sx={{ ...style, width: '70vw' }}>
          <RxCross2
            style={{
              position: 'absolute',
              right: '5px',
              top: '5px',
              zIndex: 1000,
              fontSize: '1.5rem',
            }}
            onClick={handleClose}
          />
          <Grid container spacing={2} height={800} position={'relative'}>
            <Grid item xs={12} md={6}>
              <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box sx={{ ...style, width: '70vw' }} overflow="scroll">
        <RxCross2
          style={{
            float: 'right',
            fontSize: '1.5rem',
          }}
          onClick={handleClose}
        />
        <Grid container spacing={2} height={800}>
          <Grid item xs={12} md={9}>
            <div>
              <Stack direction="row" spacing={2}>
                <Typography variant="h4" component="h2">
                  <FaCreditCard />
                </Typography>
                <Typography variant="h4" component="h2">
                  {cardDetails.name}
                </Typography>
              </Stack>
              <Typography variant="subtitle1" marginLeft={5} component="p">
                in list {cardDetails.idList}
              </Typography>
              {a ? (
                a.map((checklist) => {
                  return (
                    <CheckList
                      checklistId={checklist.id}
                      setCardCheckLists={setCardCheckLists}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            style={{
              display: 'flex',
              flexDirection: 'column',
              // alignContent: 'end',
            }}
          >
            <Typography variant="body2" color={grey}>
              Add to card
            </Typography>
            <Box marginBottom={3}>
              <AddCheckList
                cardId={cardId}
                setCardCheckLists={setCardCheckLists}
              />
            </Box>
            <Divider />
            <Typography variant="body2" color={grey}>
              Actions
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  //console.log('delete');
                  deleteCard(cardId, setCards);
                  handleClose();
                }}
                sx={{ bgcolor: color }}
              >
                <AiOutlineDelete
                  style={{
                    alignSelf: 'flex-end',
                    fontSize: '1.5rem',
                  }}
                />
                <Typography variant="body2" color={grey} marginLeft={1}>
                  Delete
                </Typography>
              </Button>
            </Box>
            {cardDetails.description}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CardDetails;
