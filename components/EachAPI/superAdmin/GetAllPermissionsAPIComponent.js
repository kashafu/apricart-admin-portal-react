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
			<Loading loading={loading}></Loading>
			<Heading>Get All Permissions</Heading>
			<CustomButton width={"1/3"} onClick={handleSubmit}>
				Get All Permissions
			</CustomButton>
			{details?.map((each) => (
				<section
					key={each.id}
					className="flex my-4 items-center justify-center mb-4"
				>
					<div className="px-4 text-lg font-medium font-lato">
						ID: {each.id}
					</div>
					<div className="px-8 font-nunito font-bold">
						<div>API Name</div>
						<div>API Endpoint</div>
						<div>Active</div>
					</div>

					<div className="px-8 font-nunito">
						<div>{each.apiName}</div>
						<div>{each.apiURL}</div>
						<div>{each.active}</div>
					</div>
				</section>
			))}
		</section>
	);
};

export default GetAllPermissionsAPIComponent;
