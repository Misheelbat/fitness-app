import { createSelector } from 'reselect';

const selectTabReducer = (state) => state.tab;

export const selectTab = createSelector(
	[selectTabReducer],
	(tab) => tab.category
);

export const selectSubCategory = createSelector(
	[selectTabReducer],
	(tab) => tab.subCategory
);

export const selectCategory = createSelector([selectTabReducer], (tab) =>
	tab.category.name.toLowerCase()
);
