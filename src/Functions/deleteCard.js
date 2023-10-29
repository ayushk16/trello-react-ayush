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
            setCards((prev) => {
                return prev.filter((card) => { return card.id !== cardId })
            })
        })
        .catch((err) => {
            console.log('error in deleteCard in function', err);
        });
}

export default deleteCard;