import axios from "axios";

import { ACTION } from "../reducers/GetBoards";
const addBoard = async ({ boardsDispatch, value }) => {
    axios({
        method: 'POST',
        url: `https://api.trello.com/1/boards/`,
        params: {
            name: value,
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            boardsDispatch(
                {
                    type: ACTION.ADDBOARD.SUCCESS,
                    payload: res.data
                }
            )
        })
        .catch((err) => {
            alert('You reached the limit of boards, please delete some boards to add new one.');
            console.log(err);
            boardsDispatch({ type: ACTION.ADDBOARD.ERROR })
        });
}

export default addBoard;