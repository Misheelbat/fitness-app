import { createSelector } from 'reselect';

const selectModal = (state) => state.modalForm;

export const selectSets = createSelector([selectModal], (modal) => modal.sets);

// export const selectSubCategory = createSelector(
// 	[selectCurrentTab],
// 	(tab) => tab.subCategory
// );

// export const selectCategoryName = createSelector([selectTab], (category) =>
// 	category.name.toLowerCase()
// );

// export const selectCategoryUrl = createSelector(
// 	[selectTab],
// 	(category) => category.url
// );

// export const selectCategoryId = createSelector(
// 	[selectTab],
// 	(category) => category.id
// );
