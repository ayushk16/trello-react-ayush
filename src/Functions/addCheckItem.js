import axios from "axios";

const addCheckItem = async ({ setCheckItemsArray, setTotalNumberOfItems, checklistId, value }) => {
    console.log('addCheckItem function', checklistId, ' % ', value, setCheckItemsArray, setTotalNumberOfItems)
    axios({
        method: 'POST',
        url: `https://api.trello.com/1/checklists/${checklistId}/checkItems`,
        params: {
            name: value,
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            //console.log('from add checkitem', res.data);
            setCheckItemsArray((prev) => [...prev, res.data]);
            setTotalNumberOfItems((prev) => prev + 1);
        })
        .catch((err) => {
            //console.log(err);
        });
}

export default addCheckItem;