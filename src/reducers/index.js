export let reducers = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_FOCUS':
            let index = 0;
            state.dataSource.forEach((item, i) => {
                if (item.id === action.id) {
                    index = i
                }
            })

            return {
                ...state,
                dataSource: [
                    ...state.dataSource.slice(0, index),
                    {
                        ...state.dataSource[index],
                        focus: !state.dataSource[index].focus
                    },
                    ...state.dataSource.slice(index + 1)
                ]
            }
        case 'deleteActivity':
            break;
        default:
            return state;
    }
}