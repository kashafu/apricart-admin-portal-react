import { useEffect } from "react";
import { useState } from "react";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import { getAllCategoriesApi } from "../../../utils/ApiCalls";
import Loading from "../../../utils/Loading";

const GetAllCategories = () => {
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState(false);

	const getCategories = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllCategoriesApi(baseUrl, {}).then((response) => {
			let status = checkStatus(response);
			status && setCategories(response.data.data);
			setLoading(false);
		});
	};

	useEffect(() => {
		getCategories()
	}, [])

	// <SingleAPILayout />
	return (
		<section>
			<Loading loading={loading} />
			{JSON.stringify(categories)}
		</section>
	)
};

export default GetAllCategories;
