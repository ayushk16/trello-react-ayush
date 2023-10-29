import axios from "axios";

import { ACTION } from '../reducers/GetCheckItemsArray';
import { ACTION as CHECKITEMACTION } from '../reducers/GetCheckItem';

const updateCheckItem = async ({ checkItemsArrayDispatch, checkedStatus, checkItemDataDispatch, cardId, checkItemId }) => {
    axios({
        method: 'PUT',
        url: `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}`,
        params: {
            state: checkedStatus ? 'complete' : 'incomplete',
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    }).then((res) => {
        console.log('from update func', res.data)
        checkItemsArrayDispatch({
            type: ACTION.EDITCHECKITEMS.SUCCESS,
            payload: res.data,
        });
        checkItemDataDispatch({
            type: CHECKITEMACTION.EDITCHECKITEM.SUCCESS,
            payload: res.data,
        });
    });
}

export default updateCheckItem;