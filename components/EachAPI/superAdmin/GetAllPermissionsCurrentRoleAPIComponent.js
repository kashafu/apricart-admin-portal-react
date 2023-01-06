import React, { useState } from "react";
import { getCurrentRolePermissionsDetailsApi } from "../../../utils/ApiCalls";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import Heading from "../../Misc/Heading";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";

const GetAllPermissionsCurrentRoleAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState([]);
	const handleSubmit = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getCurrentRolePermissionsDetailsApi(baseUrl, headers).then(
			(response) => {
				let status = checkStatus(response);
				status && setDetails(response.data.data);
				setLoading(false);
			}
		);
	};
	return (
		<section className="pl-10">
			<Loading loading={loading}></Loading>
			<Heading>Get All Permissions for your Role</Heading>
			<CustomButton width={"1/3"} onClick={handleSubmit}>
				Get All Permissions
			</CustomButton>
			{details?.map((each) => (
				<section key={each.id} className="flex my-4 mb-4">
					<div className="px-4 text-xl font-semibold font-lato">{each.id}</div>
					<div className="px-8 font-nunito font-bold">
						<div>API Name</div>
						<div>API Endpoint</div>
						<div>Active</div>
					</div>
					<div className="px-8 font-nunito">
						<div>{each.permission.apiName}</div>
						<div>{each.permission.apiURL}</div>
						<div>{each.permission.active}</div>
					</div>
				</section>
			))}
		</section>
	);
};

export default GetAllPermissionsCurrentRoleAPIComponent;
