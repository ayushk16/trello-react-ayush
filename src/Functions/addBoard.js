import axios from "axios";

const addBoard = async ({ setBoards, value }) => {
    console.log('addBoard function', value, ' % ', setBoards)
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
            console.log('from add board', res.data);
            setBoards((prev) => [...prev, res.data]);
        })
        .catch((err) => {
            console.log(err);
        });
}

export default addBoard;