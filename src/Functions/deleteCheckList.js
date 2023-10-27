import axios from "axios";

const deleteCard = ({ checklistId, setCardCheckLists }) => {
    //console.log(checklistId);
    axios({
        method: 'DELETE',
        url: `https://api.trello.com/1/checklists/${checklistId}`,
        params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            //console.log("from delete checklist", res.data);
            setCardCheckLists((prev) => {
                return prev.filter((checkList) => { return checkList.id !== checklistId })
            })
        })
        .catch((err) => {
            console.log(err);
        });
}

export default deleteCard;