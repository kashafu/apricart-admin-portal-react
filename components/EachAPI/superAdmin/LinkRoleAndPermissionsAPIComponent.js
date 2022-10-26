import React, { useEffect, useState } from "react";

import {
	getActivePermissionsApi,
	getAllRolesApi,
	getPermissionByRoleApi,
	linkRoleAndPermissionApi,
} from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
	updateRen,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

const LinkRoleAndPermissionsAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [ren, setRen] = useState("");
	const [roleArray, setRoleArray] = useState([
		{
			name: "Loading...",
		},
	]);
	const [permissionArray, setPermissionArray] = useState([]);
	// Array to contain permissions for this role
	const [linked, setLinked] = useState([]);
	const [roleId, setRoleId] = useState("");

	const handleRoleId = (e) => {
		getAllPermissionsByRole(e.target.value);
		updateRen(setRen);
		setRoleId(e.target.value);
		setLinked([]);
	};

	const getAllPermissions = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getActivePermissionsApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "");
			status && setPermissionArray(response.data.data);
			setLoading(false);
		});
	};
	const getAllRoles = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllRolesApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "");
			status && setRoleArray(response.data.data);
			setRoleId(response.data.data[0].id);
			getAllPermissionsByRole(response.data.data[0].id);
			setLoading(false);
		});
	};

	const addPermsToLinked = (array) => {
		// add already checked permissions to tne linked array
		let newArray = [];
		array?.map((each) => newArray.push(each.id));
		return newArray;
	};

	const getAllPermissionsByRole = async (id) => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getPermissionByRoleApi(baseUrl, id, headers).then((response) => {
			let existentData = addPermsToLinked(response.data.data);
			setLinked(existentData);
		});
	};

	const handleCheck = (e) => {
		// if target checked, add to the linked array
		// if not checked, delete from linked array
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
				checkStatus(response, "Permissions Assigned Successfully");
				setLoading(false);
			}
		);
	};

	useEffect(() => {
		getAllRoles();
		getAllPermissions();
	}, []);

	console.log(linked);
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
								key={ren}
								onChange={(e) => handleCheck(e)}
								value={each.id}
								checked={linked.includes(each.id, 0)}
							/>
						</div>
					</section>
				))}
				{}
				<CustomButton width={"1/3"} onClick={handleSubmit}>
					Assign Roles
				</CustomButton>
			</form>
		</section>
	);
};

export default LinkRoleAndPermissionsAPIComponent;
