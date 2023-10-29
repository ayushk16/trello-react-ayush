import axios from "axios";

const addCard = async ({ setCards, listId, value }) => {
    axios({
        method: 'POST',
        url: `https://api.trello.com/1/cards`,
        params: {
            name: value,
            idList: listId,
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            setCards((prev) => [...prev, res.data]);
        })
        .catch((err) => {
            console.log('error in addCard in functions', err);
        });
}

export default addCard;