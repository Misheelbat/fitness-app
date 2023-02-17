import { createSelector } from 'reselect';

const selectExercise = (state) => state.exercise;

export const selectExerciseId = createSelector(
	[selectExercise],
	(exercise) => exercise.id
);
