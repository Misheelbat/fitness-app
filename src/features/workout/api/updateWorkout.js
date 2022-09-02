import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, writeBatch, deleteField } from 'firebase/firestore';
import { auth, firestoreDb } from 'utils';

export const addWorkout = async (id) => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);

	await updateDoc(docRef, {
		'workout.ids': arrayUnion(id),
		[`workout.entities.${id}`]: { id, exercises: { ids: [], entities: {} } },
	});
	console.log('addWorkout done');
};

export const getWorkoutsFromDb = async () => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const workoutsMap = docSnap.data();
		return workoutsMap.workout;
	} else {
		console.log('No such document!');
	}
	return;
};

export const changeWorkoutTitle = async ({ id, data }) => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);
	const batch = writeBatch(firestoreDb);

	batch.update(docRef, {
		'workout.ids': arrayRemove(id),
	});
	batch.update(docRef, {
		'workout.ids': arrayUnion(data.id),
		[`workout.entities.${data.id}`]: data,
		[`workout.entities.${id}`]: deleteField(),
	});

	await batch.commit();
	console.log('changeWorkoutTitle done');
};

export const addExercise = async ({ title, data }) => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);
	await updateDoc(docRef, {
		[`workout.entities.${title}.id`]: title,
		[`workout.entities.${title}.exercises.ids`]: arrayUnion(data.id),
		[`workout.entities.${title}.exercises.entities.${data.id}`]: data,
	});
	console.log('addExerciseToWorkout done');
};

export const deleteExerciseFromDoc = async ({ id, workout }) => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);

	await updateDoc(docRef, {
		[`workout.entities.${workout}.exercises.ids`]: arrayRemove(id),
		[`workout.entities.${workout}.exercises.entities.${id}`]: deleteField(),
	});

	console.log('deleteExerciseFromDoc done');
};

export const deleteWorkoutFromDoc = async (id) => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);

	await updateDoc(docRef, {
		[`workout.ids`]: arrayRemove(id),
		[`workout.entities.${id}`]: deleteField(),
	});

	console.log('deleteExerciseFromDoc done');
};
