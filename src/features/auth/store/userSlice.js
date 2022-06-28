import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
};
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrentUser(state, action) {
			state.push(action.payload);
		},
	},
});

export const { setCurrentUser } = userSlice.actions;
export const userSelector = (state) => state.users;
export default userSlice.reducer;
