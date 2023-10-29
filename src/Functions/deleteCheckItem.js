import axios from "axios";

import { ACTION } from '../reducers/GetCheckItemsArray';
import { ACTION as CHECKACTION } from '../reducers/GetCheckedUnchecked';

const deleteCheckItem = ({ checkItemId, checkListId, checkItemsArrayDispatch, checkStatusDispatch }) => {
    axios({
        method: 'DELETE',
        url: `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}`,
        params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            checkItemsArrayDispatch({
                type: ACTION.DELETECHECKITEMS.SUCCESS,
                payload: checkItemId,
            })
            checkStatusDispatch({ type: CHECKACTION.DELETECHECKITEM })
        })
        .catch((err) => {
            console.log('error in deleteCheckItem in functions', err);
            checkItemsArrayDispatch({
                type: ACTION.DELETECHECKITEMS.ERROR,
            });
        });
}

export default deleteCheckItem;