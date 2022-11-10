import React, { useState } from "react";
import { getAllPermissionsApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
	sortAscending,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import Heading from "../../Misc/Heading";

const GetAllPermissionsAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState([]);

	const handleSubmit = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllPermissionsApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "");
			status && setDetails(sortAscending(response.data.data));
			setLoading(false);
		});
	};
	return (
		<section className="pl-10">
			<Loading loading={loading} />
			<Heading>Get All Permissions</Heading>
			<CustomButton width={"1/3"} onClick={handleSubmit}>
				Get All Permissions
			</CustomButton>

			<div className="grid grid-cols-6 border-b-[1px] w-full bg-white border-main-blue">
				<div></div>
				<div>ID</div>
				<div>API Name</div>
				<div className="col-span-2">API Endpoint</div>
				<div>Active</div>
			</div>
			{details?.map((each) => (
				<section key={each.id} className="grid grid-cols-6 border">
					<div></div>
					<div>{each.id}</div>
					<div>{each.apiName || "-"}</div>
					<div className="col-span-2 text-ellipsis">{each.apiURL}</div>
					<div>{each.active}</div>
				</section>
			))}
		</section>
	);
};

export default GetAllPermissionsAPIComponent;
