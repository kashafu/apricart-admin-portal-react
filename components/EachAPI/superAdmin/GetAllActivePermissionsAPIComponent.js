import React, { useState } from "react";
import { getActivePermissionsApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
	sortAscending,
} from "../../../utils/GeneralVariables";

import SingleAPILayout from "../../Layouts/SingleAPILayout";
import TableView from "../../Views/TableView";

const GetAllActivePermissionsAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState([]);

	const handleSubmit = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getActivePermissionsApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "");
			status && setDetails(sortAscending(response.data.data));
			setLoading(false);
		})
	}

	return (
		<>
			<SingleAPILayout
				heading={"Get All Active Permissions"}
				loading={loading}
				buttonOnClick={(e) => handleSubmit(e)}
				buttonText={"Get All Active Permissions"}
			>
				<TableView
					headings={["API Name", "API Endpoint", "Active"]}
					data={details}
					dataKeys={["apiName", "apiURL", "active"]}
				/>
			</SingleAPILayout>
		</>
	)
}

export default GetAllActivePermissionsAPIComponent