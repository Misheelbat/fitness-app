import { createSelector } from 'reselect';

const selectTabReducer = (state) => state.tab;

export const selectTab = createSelector(
	[selectTabReducer],
	(tab) => tab.category
);
