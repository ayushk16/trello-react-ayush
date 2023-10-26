import axios from "axios";

const addList = async ({ setBoard, boardId, value }) => {
    console.log('addlist function', boardId, ' % ', value, setBoard)
    axios({
        method: 'POST',
        // url: `https://api.trello.com/1/lists?name=${listValue}&idBoard=${boardId}`,
        url: `https://api.trello.com/1/lists`,
        params: {
            name: value,
            idBoard: boardId,
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            console.log("add list", res.data);
            setBoard((prev) => [...prev, res.data]);
        })
        .catch((err) => {
            console.log(err);
        });
}

export default addList;