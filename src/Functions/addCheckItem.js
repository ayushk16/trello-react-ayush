import axios from "axios";
import { ACTION } from '../Hooks/GetCheckItemsArray';

const addCheckItem = async ({ checkItemsArrayDispatch, checkListId, value }) => {
    axios({
        method: 'POST',
        url: `https://api.trello.com/1/checklists/${checkListId}/checkItems`,
        params: {
            name: value,
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            checkItemsArrayDispatch({ type: ACTION.ADDCHECKITEMS.SUCCESS, payload: res.data });
        })
        .catch((err) => {
            console.log('error in addCheckItem in functions', err);
            checkItemsArrayDispatch({ type: ACTION.ADDCHECKITEMS.ERROR });
        });
}

export default addCheckItem;