import styles from './Tags.module.css';

export const Tags = ({ tags = [], tag = '' }) => {
	return (
		<div className={styles.tags}>
			{tags &&
				tags.map((tag, i) => (
					<div key={i} className={styles.tag}>
						{tag.name}
					</div>
				))}
			{tag && <div className={styles.tag}>{tag}</div>}
		</div>
	);
};
