import styles from './Tags.module.css';

export const Tags = ({ tags }) => {
	return (
		<div className={styles.tags}>
			{tags &&
				tags.map((tag, i) => (
					<div key={i} className={styles.tag}>
						{tag?.name}
					</div>
				))}
		</div>
	);
};
