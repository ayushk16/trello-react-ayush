import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Paper, Stack, Box, Typography } from '@mui/material';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import useGetCards from '../../Hooks/GetCards';
import AddCard from '../common/AddCard';
import CardDetails from '../Cards/CardDetails';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 1200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ListCards = ({ listId, setBoards }) => {
  const [open, setOpen] = React.useState(false);
  const [modalCardId, setModalCardId] = React.useState(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setModalCardId(null);
    setOpen(false);
  };

  const navigate = useNavigate();
  const { cards, setCards, loading, error } = useGetCards(listId);
  if (loading) {
    return (
      <>
        <div>Loading...</div>
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
            <Paper elevation={4}>
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
                    <AiOutlineEdit
                      onClick={() => {
                        deleteCard(card.id);
                      }}
                    />
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          );
        })}
        <AddCard listId={listId} setCards={setCards} />
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

const deleteCard = (cardId) => {
  console.log(cardId);
};

export default ListCards;
