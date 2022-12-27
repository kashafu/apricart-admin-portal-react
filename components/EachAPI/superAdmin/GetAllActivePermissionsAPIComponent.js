import React, { useState } from "react";
import { getActivePermissionsApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
	sortAscending,
} from "../../../utils/GeneralVariables";

import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import Heading from "../../Misc/Heading";

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
		});
	};
	return (
		<section className="pl-10">
			<Loading loading={loading} />
			<Heading>Get All Active Permissions</Heading>
			<CustomButton width={"1/3"} onClick={handleSubmit}>
				Get All Active Permissions
			</CustomButton>
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
		</section>
	);
};

export default GetAllActivePermissionsAPIComponent;
