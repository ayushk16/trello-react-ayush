import axios from "axios";

const deleteCard = async (cardId, setCards) => {
    axios({
        method: 'DELETE',
        url: `https://api.trello.com/1/cards/${cardId}`,
        params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            //console.log("from delete card", res.data);
            setCards((prev) => {
                return prev.filter((card) => { return card.id !== cardId })
            })
        })
        .catch((err) => {
            console.log(err);
        });
}

export default deleteCard;