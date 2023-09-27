import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notify(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { notify, removeNotification } = notificationSlice.actions

export const setNotification = (notification, timeInSecods) => {
  return async dispatch => {
    dispatch(notify(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeInSecods * 1000)
  }
}

export default notificationSlice.reducer