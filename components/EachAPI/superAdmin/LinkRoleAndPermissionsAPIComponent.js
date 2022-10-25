import React, { useEffect, useState } from "react";
import {
	getAllPermissionsApi,
	getAllRolesApi,
	linkRoleAndPermissionApi,
} from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

const LinkRoleAndPermissionsAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [roleArray, setRoleArray] = useState([
		{
			name: "Loading...",
		},
	]);
	const [permissionArray, setPermissionArray] = useState([]);
	const [linked, setLinked] = useState([]);
	const [number, setNumber] = useState("");
	const [roleId, setRoleId] = useState("");

	const handleRoleId = (e) => {
		console.log(e.target.value);
		setRoleId(e.target.value);
	};

	const getAllPermissions = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllPermissionsApi(baseUrl, headers).then((response) => {
			console.log(response);
			let status = checkStatus(response, "");
			status && setPermissionArray(response.data.data);
			setLoading(false);
			setLoading(false);
		});
	};
	const getAllRoles = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllRolesApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "");
			status && setRoleArray(response.data.data);
			setRoleId(response.data.data[0].id);
			setLoading(false);
		});
	};

	const handleCheck = (e) => {
		let id = e.target.value;
		let checked = e.target.checked;
		if (checked) {
			setLinked([...linked, e.target.value]);
		} else {
			let killIndex = linked.findIndex((each) => each === id);
			console.log("Kill Index", killIndex);
			let newLinked = linked;
			newLinked.splice(killIndex, 1);
			setLinked(newLinked);
		}
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await linkRoleAndPermissionApi(baseUrl, roleId, linked, headers).then(
			(response) => {
				console.log(response);
				setLoading(false);
			}
		);
	};

	useEffect(() => {
		getAllRoles();
		getAllPermissions();
	}, []);

	return (
		<section className="pl-10">
			<Loading loading={loading} />
			<Heading>Assign Permissions to Role</Heading>
			<form action="" method="POST">
				<CustomSelectInput
					onChange={(e) => handleRoleId(e)}
					heading={"Role Id"}
					values={roleArray.map((each) => each.id)}
					options={roleArray.map((each) => each.name)}
				/>
				{permissionArray?.map((each, index) => (
					<section
						key={each.id}
						className="flex my-4 mb-4 items-center justify-center bg-main-blue-100 border-x-8 border-main-blue"
					>
						<div className="px-4 text-lg font-medium font-lato">
							ID: {each.id}
						</div>
						<div className="px-8 font-nunito font-bold w-1/4">
							<div>API Name</div>
							<div>API Endpoint</div>
							<div>Active</div>
						</div>

						<div className="px-8 font-nunito w-1/4">
							<div>{each.apiName}</div>
							<div>{each.apiURL}</div>
							<div>{each.active}</div>
						</div>
						<div className="px-4 w-1/4">
							<input
								type="checkbox"
								className="w-5 h-5"
								onChange={(e) => handleCheck(e)}
								value={each.id}
							/>
						</div>
					</section>
				))}
				{}
				<CustomButton width={"1/3"} onClick={handleSubmit}>
					Assign Role
				</CustomButton>
			</form>
		</section>
	);
};

export default LinkRoleAndPermissionsAPIComponent;
