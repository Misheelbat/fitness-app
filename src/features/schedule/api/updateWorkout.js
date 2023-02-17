import { doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';
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

export const deleteEventFromSchedules = async (id) => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);

	await updateDoc(docRef, {
		[`schedules.${id}`]: deleteField(),
	});
};
