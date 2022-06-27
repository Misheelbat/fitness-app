import { Helmet } from 'react-helmet-async';
export const Head = ({ title = '', description = '' }) => {
	return (
		<Helmet
			title={title ? `${title} | FitBody` : undefined}
			defaultTitle="FitBody"
		>
			<meta name="description" content={description} />
		</Helmet>
	);
};
