import {store} from '../store'


export let focusActivity = (rowData, index) => {

    setTimeout(function() {
        store.dispatch({
            type: 'TOGGLE_FOCUS',
            id: rowData.id,
            index: index
        })
    }, 100);
    return;
}

export let deleteActivity = (rowData) => {
    return store.dispatch({
        type: 'DELETE_ACTIVITY',
        id: rowData.id
    })
}