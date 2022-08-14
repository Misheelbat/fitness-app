import { useParams } from 'react-router-dom';
import { ContentLayout } from 'components/Layout';
import { WorkoutTemplate } from '../../components/WorkoutTemplate/WorkoutTemplate';

export const Workout = () => {
	const { id } = useParams();
	console.log(id);
	// Firestore.collection("workoutPlan").doc(id)
	// use id to get data and pass it to template as []
	return (
		<ContentLayout title="Programm">
			<WorkoutTemplate />
		</ContentLayout>
	);
};
