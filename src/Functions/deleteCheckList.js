import axios from "axios";

const deleteCard = (checkListId, setCheckLists) => {
    axios({
        method: 'DELETE',
        url: `https://api.trello.com/1/checklists/${checkListId}`,
        params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            console.log("from delete checklist", res.data);
            setCheckLists((prev) => {
                return prev.filter((checkList) => { return checkList.id !== checkListId })
            })
        })
        .catch((err) => {
            console.log(err);
        });
}

export default deleteCard;