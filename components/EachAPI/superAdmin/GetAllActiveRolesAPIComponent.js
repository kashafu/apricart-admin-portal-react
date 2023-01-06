import React, { useState } from "react";
import {
	getActivePermissionsApi,
	getActiveRolesApi,
} from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import Heading from "../../Misc/Heading";

const GetAllActiveRolesAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [roleArray, setRoleArray] = useState([]);
	const handleSubmit = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getActiveRolesApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response);
			status && setRoleArray(response.data.data);
			setLoading(false);
		});
	};
	return (
		<section className="pl-10">
			<Loading loading={loading} />
			<Heading>Get All Active Roles</Heading>
			<CustomButton width={"1/3"} onClick={handleSubmit}>
				Get All Active Roles
			</CustomButton>
			<div className="grid grid-cols-4 border-b-[1px] border-main-blue">
				<div></div>
				<div>ID</div>
				<div>API Name</div>
				<div>Active</div>
			</div>
			{roleArray?.map((each) => (
				<section key={each.id} className="grid grid-cols-4 border">
					<div></div>
					<div>{each.id}</div>
					<div>{each.name || "-"}</div>
					<div>{each.active}</div>

					<div className="col-span-2" />
				</section>
			))}
		</section>
	);
};

export default GetAllActiveRolesAPIComponent;
