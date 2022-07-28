import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return null;
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

// timeoutId will be encapsulated in this file. So when displayNotification is called, timeoutId will have a value and if displayNotification is called again under the duration of duraiton parameter, it will reset timeoutId so that our timeout will be resetted with a new timeout.
let timeoutId;

export const displayNotification = (message, duration = 5000) => {
  return async (dispatch) => {
    dispatch(setNotification(message));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch(removeNotification());
    }, duration);
  };
};

export default notificationSlice.reducer;
