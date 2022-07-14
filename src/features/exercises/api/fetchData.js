import axios from 'axios';

export const fetchData = async (URL) => {
	const res = await axios.get(URL);
	const data = res.data.results;
	return data;
};
