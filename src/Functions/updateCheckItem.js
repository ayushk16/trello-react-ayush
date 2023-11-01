import axios from "axios";

import { ACTION } from '../Hooks/GetCheckItemsArray';

const updateCheckItem = async ({ checkItemsArrayDispatch, checkedStatus, cardId, checkItemId }) => {
    axios({
        method: 'PUT',
        url: `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}`,
        params: {
            state: checkedStatus ? 'complete' : 'incomplete',
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    }).then((res) => {
        // console.log('from update func', res.data)
        checkItemsArrayDispatch({
            type: ACTION.EDITCHECKITEMS.SUCCESS,
            payload: res.data,
        });
    });
}

export default updateCheckItem;