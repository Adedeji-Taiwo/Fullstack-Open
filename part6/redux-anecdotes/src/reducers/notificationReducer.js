const initialState = [];



const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return [...state, action.data]
        case 'HIDE_NOTIFICATION':
            return state.filter(notification =>notification.id !== action.data)
        default: 
            return state;
    }
}


// async action creator
let notificationId = 0;
export const notificationChange = (notification) => {

    return async (dispatch) => {
        const id = notificationId++;

        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                id: id,
                notification: notification
            }
        })

        setTimeout(() => 
            dispatch({
                type: 'HIDE_NOTIFICATION',
                data: id
            }), 5000)
    }
}



export default notificationReducer;