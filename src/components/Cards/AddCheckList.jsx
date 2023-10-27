import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import { Typography } from '@mui/material';
import { TbChecklist } from 'react-icons/tb';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCheckList({ cardId, setCardCheckLists }) {
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
          // //console.log('from add checkitem', res.data);
          setCardCheckLists((prev) => [...prev, res.data]);
          handleClose();
        })
        .catch((err) => {
          // //console.log(err);
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
        <DialogTitle>{'ADD LIST'}</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={checkListName}
            onChange={(e) => setCheckListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              // //console.log('cancel');
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              // //console.log('cancel');
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
