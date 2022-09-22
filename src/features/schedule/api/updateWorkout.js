import {
	doc,
	getDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
	deleteField,
} from 'firebase/firestore';
import { auth, firestoreDb } from 'utils';

export const addEvent = async (data) => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);

	await updateDoc(docRef, {
		[`schedules.${data.id}`]: data,
	});
	console.log('addEvent done');
};

export const getSchedulesFromDb = async () => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const userData = docSnap.data();
		return userData.schedules;
	} else {
		console.log('No such document!');
	}
	return;
};

export const changeEventStatus = async ({ id, status }) => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);

	await updateDoc(docRef, {
		[`schedules.${id}.status`]: status,
	});
	console.log('changeEventStatus done');
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
