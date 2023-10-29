import React from 'react';
import { Modal, Paper, Stack, Box, Typography, Skeleton } from '@mui/material';
import { AiOutlineEdit } from 'react-icons/ai';

import CardDetails from '../Cards/CardDetails';
import AddItem from '../common/AddItem';

import useGetCards from '../../Hooks/GetCards';

import addCard from '../../Functions/addCard';

const ListCards = ({ listId }) => {
  const [open, setOpen] = React.useState(false);
  const [modalCardId, setModalCardId] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setModalCardId(null);
    setOpen(false);
  };

  const { cards, setCards, loading, error } = useGetCards(listId);
  if (loading) {
    return (
      <>
        <div>
          <Skeleton animation="wave"></Skeleton>
        </div>
      </>
    );
  } else if (error) {
    return (
      <>
        <div>error...{listId}</div>
      </>
    );
  } else {
    return (
      <>
        {cards.map((card) => {
          return (
            <Paper elevation={4} key={card.id} className="list-card">
              <Box
                height={40}
                alignContent="center"
                onClick={() => {
                  setModalCardId(card.id);
                  handleOpen();
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  padding={1}
                >
                  <Typography variant="body1">{card.name}</Typography>
                  <Typography variant="body1">
                    <AiOutlineEdit />
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          );
        })}
        <AddItem
          addFunction={addCard}
          addFunctionParams={{ setCards, listId }}
          itemName={'Card'}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <CardDetails
            cardId={modalCardId}
            handleClose={handleClose}
            handleOpen={handleOpen}
            setCards={setCards}
          />
        </Modal>
      </>
    );
  }
};

export default ListCards;
