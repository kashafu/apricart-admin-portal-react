import React, { useState } from "react";
import { getActivePermissionsApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
	sortAscending,
} from "../../../utils/GeneralVariables";

import SingleAPILayout from "../../Layouts/SingleAPILayout";

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
			/>
			<div>
				{details?.map((each) => (
					<section key={each.id} className=" my-4 grid grid-cols-8 mb-4">
						<div className="col-span-2" />
						<div className="px-4 text-lg col-span-1 font-medium font-lato">
							ID: {each.id}
						</div>
						<div className="px-8 font-nunito col-span-1 font-bold">
							<div>API Name</div>
							<div>API Endpoint</div>
							<div>Active</div>
						</div>

						<div className="px-8 col-span-4 font-nunito">
							<div>{each.apiName}</div>
							<div>{each.apiURL}</div>
							<div>{each.active}</div>
						</div>
						<div className="" />
					</section>
				))}
			</div>
		</>
	)
}

export default GetAllActivePermissionsAPIComponent