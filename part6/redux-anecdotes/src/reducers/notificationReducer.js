import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification(state, action) {
            state = action.payload
            return state;
        },
        hideNotification(state, action) {
            state = initialState
            return state;
        }
    }
})

export const { addNotification, hideNotification } = notificationSlice.actions;



// async action creator
let timerId;

export const setNotification = (notificationMsg, delay) => {

    return (dispatch) => {
        clearTimeout(timerId);

        dispatch(addNotification(notificationMsg));

        timerId = setTimeout(() => dispatch(hideNotification()), delay)

    }
}

export default notificationSlice.reducer;



