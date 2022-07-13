import axios from 'axios';

export const getData = async (URL) => {
	const res = await axios.get(URL);
	const data = res.data;
	return data;
};
