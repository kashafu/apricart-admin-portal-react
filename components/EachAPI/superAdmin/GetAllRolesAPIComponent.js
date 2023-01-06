import React, { useState } from "react";
import { getAllRolesApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import Heading from "../../Misc/Heading";

const GetAllRolesAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [roleArray, setRoleArray] = useState([]);
	const handleSubmit = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllRolesApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response);
			status && setRoleArray(response.data.data);
			setLoading(false);
		});
	};
	return (
		<section className="pl-10">
			<Loading loading={loading}></Loading>
			<Heading>Get All Roles</Heading>
			<CustomButton width={"1/3"} onClick={handleSubmit}>
				Get All Roles
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

export default GetAllRolesAPIComponent;
