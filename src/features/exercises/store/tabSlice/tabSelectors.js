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

export const selectCategory = createSelector([selectTab], (category) =>
	category.name.toLowerCase()
);

export const selectCategoryUrl = createSelector(
	[selectTab],
	(category) => category.url
);
export const selectCategoryId = createSelector(
	[selectTab],
	(category) => category.id
);
