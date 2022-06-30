import React from 'react';

import { Layout } from 'features/auth/components/Layout/Layout';
import { ForgotPassForm } from 'features/auth/components/ForgotPassForm/ForgotPassForm';

export const ResetPass = () => {
	return (
		<Layout title="Reset your Password">
			<ForgotPassForm />
		</Layout>
	);
};

export default ResetPass;
