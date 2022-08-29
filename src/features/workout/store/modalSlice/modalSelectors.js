import { createSelector } from 'reselect';

const selectModal = (state) => state.workouts;

export const selectSets = createSelector([selectModal], (modal) => modal.sets);

export const selectSearchResult = createSelector(
	[selectModal],
	(workouts) => workouts.searchResultId
);
