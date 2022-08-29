import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { auth, firestoreDb } from 'utils';

export const addWorkoutv2 = async ({ id, data }) => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);

	await updateDoc(docRef, {
		'workout.ids': arrayUnion(id),
		path: data,
	});
	console.log('addWorkout done');
};

// export const addExerciseToWorkout = async ({ id, data }) => {
// 	const key = auth.currentUser.uid;
// 	const docRef = doc(firestoreDb, 'users', key);
// 	await updateDoc(docRef, {
// 		[workout.entities[id].exercises.id]: arrayUnion(data.id),
// 		[workout.entities[id].exercises.entities[id]]: data.reps,
// 	});
// 	console.log('addExerciseToWorkout done');
// };

// id = title
// data = id:{id:[], exercises:{}}
