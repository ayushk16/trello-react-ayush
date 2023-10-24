import React from 'react';
import {
  Modal,
  Box,
  Button,
  Typography,
  Skeleton,
  Divider,
  Grid,
  Stack,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { FaCreditCard } from 'react-icons/fa';
import { TbChecklist } from 'react-icons/tb';
import { PiArchiveDuotone } from 'react-icons/pi';
import useGetCardDetails from '../../Hooks/GetCardDetails';
import { grey } from '@mui/material/colors';
import CheckLists from './CheckLists';

const style = {
  position: 'absolute',
  top: '50%',
  width: '70vw',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CardDetails = ({ cardId, handleClose, handleOpen }) => {
  const { cardDetails, setCardDetails, loading, error } =
    useGetCardDetails(cardId);
  console.log(cardDetails);
  if (loading) {
    return (
      <>
        <Box sx={{ ...style }}>
          <Grid container spacing={2} height={800}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <RxCross2 style={{ float: 'right' }} onClick={handleClose} />
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
      <Box sx={{ ...style }}>
        <Grid container spacing={2} height={800}>
          <Grid item xs={12} sm={9}>
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
              <CheckLists
                cardId={cardDetails.id}
                CheckListArray={cardDetails.idChecklists}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'end',
            }}
          >
            <RxCross2
              style={{ alignSelf: 'flex-end', fontSize: '1.5rem' }}
              onClick={handleClose}
            />
            <Typography variant="body2" color={grey}>
              Add to card
            </Typography>
            <Box marginBottom={3}>
              <Button variant="contained" color="secondary">
                <TbChecklist
                  style={{ alignSelf: 'flex-end', fontSize: '1.5rem' }}
                  onClick={handleClose}
                />
                <Typography
                  variant="body2"
                  color={grey}
                  marginLeft={1}
                  onClick={() => {
                    console.log('checklist add');
                  }}
                >
                  checklists
                </Typography>
              </Button>
            </Box>
            <Divider />
            <Typography variant="body2" color={grey}>
              Actions
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  console.log('archive');
                }}
              >
                <PiArchiveDuotone
                  style={{ alignSelf: 'flex-end', fontSize: '1.5rem' }}
                  onClick={handleClose}
                />
                <Typography variant="body2" color={grey} marginLeft={1}>
                  Archive
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
