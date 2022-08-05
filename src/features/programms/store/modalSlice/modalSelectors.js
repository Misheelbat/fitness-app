import { createSelector } from 'reselect';

const selectModal = (state) => state.modalForm;

export const selectSets = createSelector([selectModal], (modal) => modal.sets);

export const selectSearchResult = createSelector(
	[selectModal],
	(modal) => modal.searchResultId
);
