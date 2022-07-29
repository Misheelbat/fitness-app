import { useEffect, useRef } from 'react';

export function Checkbox({ indeterminate, className = '', ...rest }) {
	const ref = useRef();

	useEffect(() => {
		if (typeof indeterminate === 'boolean') {
			ref.current.indeterminate = !rest.checked && indeterminate;
		}
	}, [ref, indeterminate]);

	return (
		<input
			type="checkbox"
			ref={ref}
			className={className + ' cursor-pointer'}
			{...rest}
		/>
	);
}
