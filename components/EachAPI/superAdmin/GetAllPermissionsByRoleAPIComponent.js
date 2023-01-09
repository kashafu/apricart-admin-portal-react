import { useEffect, useState } from "react";

import { getAllRolesApi, getPermissionByRoleApi } from "../../../utils/ApiCalls";
import { checkStatus, getGeneralApiParams } from "../../../utils/GeneralVariables";
import SingleAPILayout from "../../Layouts/SingleAPILayout";
import CustomSelectInput from "../../Misc/CustomSelectInput";

const GetAllPermissionsByRoleAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState([]);
	const [roleId, setRoleId] = useState(1);
	const [roleArray, setRoleArray] = useState([
		{
			name: "Loading...",
		},
	])

	useEffect(() => {
		getAllRoles();
	}, [])

	const handleSubmit = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getPermissionByRoleApi(baseUrl, roleId, headers).then((response) => {
			let status = checkStatus(response);
			status && setDetails(response.data.data);
			!status && setDetails([]);
			setLoading(false);
		});
	};

	const handleRoleId = (e) => {
		setRoleId(e.target.value);
	};

	const getAllRoles = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllRolesApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "");
			status && setRoleArray(response.data.data);
			setLoading(false);
		});
	};

	return (
		<>
			<SingleAPILayout
				heading={"Get All Permissions by Role"}
				loading={loading}
				buttonOnClick={(e) => handleSubmit(e)}
				buttonText={"Get All Permissions"}
				rowItems={
					<CustomSelectInput
						onChange={(e) => handleRoleId(e)}
						heading={"Role Id"}
						values={roleArray.map((each) => each.id)}
						options={roleArray.map((each) => each.name)}
					/>
				}
			/>
			<div>
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
						<div>{each.permission.id}</div>
						<div>{each.permission.apiName || "-"}</div>
						<div className="col-span-2 text-ellipsis">
							{each.permission.apiURL}
						</div>
						<div>{each.permission.active}</div>
					</section>
				))}
			</div>
		</>
	)
}

export default GetAllPermissionsByRoleAPIComponent