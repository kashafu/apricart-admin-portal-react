import React, { useEffect, useState } from "react";
import {
	getAllRolesApi,
	getPermissionByRoleApi,
} from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

const GetAllPermissionsByRoleAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState([]);
	const [roleId, setRoleId] = useState(1);
	const [roleArray, setRoleArray] = useState([
		{
			name: "Loading...",
		},
	]);

	const handleSubmit = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getPermissionByRoleApi(baseUrl, roleId, headers).then((response) => {
			console.log(response);
			let status = checkStatus(response);
			status && setDetails(response.data.data);
			setLoading(false);
		});
	};

	const handleRoleId = (e) => {
		console.log(e.target.value);
		setRoleId(e.target.value);
	};

	const getAllRoles = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllRolesApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "");
			status && setRoleArray(response.data.data);
			setLoading(false);
			setLoading(false);
		});
	};

	useEffect(() => {
		getAllRoles();
	}, []);
	return (
		<section className="pl-10">
			<Loading loading={loading}></Loading>
			<Heading>Get All Permissions by Role</Heading>
			<CustomSelectInput
				onChange={(e) => handleRoleId(e)}
				heading={"Role Id"}
				values={roleArray.map((each) => each.id)}
				options={roleArray.map((each) => each.name)}
			/>
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

export default GetAllPermissionsByRoleAPIComponent;
