import React from 'react';

import styles from './TabList.module.css';
export const TabList = ({ Element = 'div', children, ...props }) => {
	return (
		<Element role="tablist" {...props} className={styles.tabList}>
			{children}
		</Element>
	);
};
