import { Head } from 'components/Head';

export const ContentLayout = ({ children, title }) => {
	return (
		<>
			<Head title={title} />
			<div>
				<div>
					<h1>{title}</h1>
				</div>
				<div>{children}</div>
			</div>
		</>
	);
};
