import axios from "axios";

const addCard = async ({ setCards, listId, value }) => {
    console.log('addCard function', listId, ' % ', value, setCards)
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
            console.log(addCard, res.data);
            setCards((prev) => [...prev, res.data]);
        })
        .catch((err) => {
            console.log(err);
        });
}

export default addCard;