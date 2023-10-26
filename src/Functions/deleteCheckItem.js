import axios from "axios";

const deleteCheckItem = ({ checkItemId, checkListId, setCheckItemsArray }) => {
    axios({
        method: 'DELETE',
        url: `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}`,
        params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            console.log("from delete checklist", res.data);
            setCheckItemsArray((prev) => {
                return prev.filter((item) => item.id !== checkItemId);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

export default deleteCheckItem;