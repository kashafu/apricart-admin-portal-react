import React from "react";
import { getAllCategoriesApi } from "../../../utils/ApiCalls";

const GetAllCategories = () => {
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState(false);

	const getCategories = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllCategoriesApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response);
			status && setCategories(response.data.data);
			setLoading(false);
		});
	};

	return <div>GetAllCategories</div>;
};

export default GetAllCategories;
