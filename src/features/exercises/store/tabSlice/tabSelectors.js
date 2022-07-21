import { createSelector } from 'reselect';

const selectCurrentTab = (state) => state.tab;

export const selectTab = createSelector(
	[selectCurrentTab],
	(tab) => tab.category
);

export const selectSubCategory = createSelector(
	[selectCurrentTab],
	(tab) => tab.subCategory
);

export const selectCategory = createSelector([selectCurrentTab], (tab) =>
	tab.category.name.toLowerCase()
);
