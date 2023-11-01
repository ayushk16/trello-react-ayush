import React, { useState } from 'react';
import axios from 'axios';

import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Slide,
} from '@mui/material';

import { TbChecklist } from 'react-icons/tb';

import { ACTION } from '../../Hooks/GetCheckLists';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCheckList({ cardId, cardCheckListsDispatch }) {
  const [open, setOpen] = React.useState(false);
  const [checkListName, setCheckListName] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addValue = () => {
    if (checkListName) {
      axios({
        method: 'POST',
        url: `https://api.trello.com/1/cards/${cardId}/checklists`,
        params: {
          name: checkListName,
          key: import.meta.env.VITE_API_KEY,
          token: import.meta.env.VITE_TOKEN,
        },
      })
        .then((res) => {
          cardCheckListsDispatch({
            type: ACTION.ADDCHECKLISTS.SUCCESS,
            payload: res.data,
          });
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          cardCheckListsDispatch({ type: ACTION.ADDCHECKLISTS.ERROR });
        });
    }

    setCheckListName('');
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        <TbChecklist style={{ alignSelf: 'flex-end', fontSize: '1.5rem' }} />
        <Typography variant="body2" marginLeft={1}>
          CHECKLIST
        </Typography>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'ADD CHECKLIST'}</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Checklist Name"
            variant="outlined"
            value={checkListName}
            onChange={(e) => setCheckListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              addValue();
            }}
          >
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
