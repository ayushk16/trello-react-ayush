import { useReducer, useEffect } from 'react'

export const ACTION = {
    SETLENGTHS: 'SETLENGTHS',
    EDITCHECKITEM: {
        CHECKED: 'CHECKED',
        UNCHECKED: 'UNCHECKED',
    },
    DELETECHECKITEM: 'DELETECHECKITEM',
    ADDCHECKITEM: 'ADDCHECKITEM',
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTION.SETLENGTHS:
            return { numberOfCheckedItems: action.payload.checked, totalNumberOfItems: action.payload.total };
        case ACTION.ADDCHECKITEM:
            return { ...state, totalNumberOfItems: state.totalNumberOfItems + 1 };
        case ACTION.EDITCHECKITEM.CHECKED:
            return { ...state, numberOfCheckedItems: state.numberOfCheckedItems + 1 };
        case ACTION.EDITCHECKITEM.UNCHECKED:
            return { ...state, numberOfCheckedItems: state.numberOfCheckedItems - 1 };
        case ACTION.DELETECHECKITEM:
            return { ...state, totalNumberOfItems: state.totalNumberOfItems - 1 };
    }
};

const initialState = {
    numberOfCheckedItems: 0,
    totalNumberOfItems: 0,
};

const useGetCheckedUnchecked = (checkItemsArray) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        let checkedItems = 0;
        checkItemsArray.data.forEach((item) => {
            if (item.state == 'complete') {
                checkedItems++;
            }
        });
        dispatch({ type: ACTION.SETLENGTHS, payload: { total: checkItemsArray.data.length, checked: checkedItems } });
    }, [checkItemsArray]);

    return ({ state, dispatch })
}

export default useGetCheckedUnchecked