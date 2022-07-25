const bodyFront = 'url(/images/muscles/muscular_system_front.svg)';
const bodyBack = 'url(/images/muscles/muscular_system_back.svg)';

export function createImagesUrl(primary, secondary) {
	const front = [];
	const back = [];

	primary.forEach((m) => {
		const url = `url(${m.image_url_main.substring(7)})`;
		if (m.is_front) {
			front.push(url);
		} else {
			back.push(url);
		}
	});

	secondary.forEach((m) => {
		const url = `url(${m.image_url_secondary.substring(7)})`;
		if (m.is_front) {
			front.push(url);
		} else {
			back.push(url);
		}
	});

	front.push(bodyFront);
	back.push(bodyBack);
	return { front, back };
}
