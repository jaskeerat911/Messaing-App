import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        channelId: null,
        channelName: null
    },
    reducers: {
        setChannelInfo: (state, action) => {
            state.channelId = action.payload.channelId
            state.channelName = action.payload.channelName
        }
    },
});

export const { setChannelInfo } = appSlice.actions; //set Current Channel

export const selectChannelId = (state) => state.app.channelId; // get current channel id
export const selectChannelName = (state) => state.app.channelName; // get current channel name

export default appSlice.reducer;
