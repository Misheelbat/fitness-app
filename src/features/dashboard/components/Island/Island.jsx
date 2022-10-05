import styles from './Island.module.css';

export const Island = ({ children, ...rest }) => {
	return (
		<div className={styles.island} {...rest}>
			{children}
		</div>
	);
};

Island.Title = function IslandTitle({ children }) {
	return <div className={styles.islandTitle}>{children}</div>;
};

Island.Content = function IslandContent({ children }) {
	return <div className={styles.islandContent}>{children}</div>;
};

Island.Footer = function IslandFooter({ children }) {
	return <div className={styles.islandFooter}>{children}</div>;
};
