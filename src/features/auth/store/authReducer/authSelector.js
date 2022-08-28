import { createSelector } from 'reselect';

const selectAuth = (state) => state.user;

export const selectDisplayName = createSelector(
	[selectAuth],
	(user) => user.displayName
);
export const selectEmail = createSelector([selectAuth], (user) => user.email);
