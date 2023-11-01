import axios from "axios";
import { ACTION } from "../Hooks/GetCheckLists";

const deleteCard = ({ checkListId, cardCheckListsDispatch }) => {
    axios({
        method: 'DELETE',
        url: `https://api.trello.com/1/checklists/${checkListId}`,
        params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            cardCheckListsDispatch({ type: ACTION.DELETECHECKLISTS.SUCCESS, payload: checkListId })
        })
        .catch((err) => {
            console.log('error in deleteCard in functions', err);
            cardCheckListsDispatch({ type: ACTION.DELETECHECKLISTS.ERROR })
        });
}

export default deleteCard;