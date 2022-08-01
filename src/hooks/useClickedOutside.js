import { useEffect } from 'react';

export function useClickedOutside(ref, callback) {
	useEffect(() => {
		function handleClickOutside(event) {
			console.log('You clicked outside of me!');
			if (ref.current && !ref.current.contains(event.target)) {
				callback();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, callback]);
}
