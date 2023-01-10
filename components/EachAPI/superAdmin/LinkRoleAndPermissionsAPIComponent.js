import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

import {
	getActivePermissionsApi,
	getAllRolesApi,
	getPermissionByRoleApi,
	linkRoleAndPermissionApi,
} from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
	sortAscending,
	updateRen,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import SingleAPILayout from "../../Layouts/SingleAPILayout";
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

	useEffect(() => {
		getAllRoles();
		getAllPermissions();
	}, [])

	const handleRoleId = (e) => {
		getAllPermissionsByRole(e.target.value);
		updateRen(setRen);
		setRoleId(e.target.value);
		setLinked([]);
	};

	const fitIntoMultiArray = (array) => {
		let tempArr = [];
		array.map((each) => {
			tempArr.push({ label: each.apiName, value: each.id });
		});
		setPermissionArray(tempArr);
	};

	const getAllPermissions = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getActivePermissionsApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "");
			status && setPermissionArray(sortAscending(response.data.data));
			// sets up all permissions into the linked
			status && fitIntoMultiArray(response.data.data);

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
		// add already added permissions to tne linked array
		let newArray = [];
		let sorted = sortAscending(array);
		sorted?.map((each) => {
			newArray.push({
				label: each.permission.apiName,
				value: each.permission.id,
			});
		});

		return newArray;
	};

	const getAllPermissionsByRole = async (id) => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getPermissionByRoleApi(baseUrl, id, headers).then((response) => {
			let existentData = addPermsToLinked(response.data.data);
			setLinked(existentData);
		});
	};

	// const handleCheck = (e) => {
	// 	// if target checked, add to the linked array
	// 	// if not checked, delete from linked array
	// 	let id = e.target.value;
	// 	let checked = e.target.checked;
	// 	if (checked) {
	// 		setLinked([...linked, e.target.value]);
	// 	} else {
	// 		let killIndex = linked.findIndex((each) => each === id);
	// 		console.log("Kill Index", killIndex);
	// 		let newLinked = linked;
	// 		newLinked.splice(killIndex, 1);
	// 		setLinked(newLinked);
	// 	}
	// };

	const submitIdsOnly = (array) => {
		let tempArr = [];
		array.map((each) => {
			tempArr.push(each.value);
		});

		return tempArr;
	}

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		let newPerms = submitIdsOnly(linked);
		await linkRoleAndPermissionApi(baseUrl, roleId, newPerms, headers).then(
			(response) => {
				checkStatus(response, "Permissions Assigned Successfully");
				setLoading(false);
			}
		);
	}

	// return (
	// 	<SingleAPILayout
	// 		heading={"Assign Permissions to Role"}
	// 		loading={loading}
	// 		buttonOnClick={(e) => handleSubmit(e)}
	// 		buttonText={"Assign Roles"}
	// 		rowItems={
	// 			<CustomSelectInput
	// 				onChange={(e) => handleRoleId(e)}
	// 				heading={"Role Name"}
	// 				values={roleArray.map((each) => each.id)}
	// 				options={roleArray.map((each) => each.name)}
	// 			/>
	// 		}
	// 	>
	// 		<div className={`w-full grid grid-cols-5`}>
	// 			<div>
	// 				<p className="ml-2 font-nunito">Permissions</p>
	// 			</div>
	// 			<div className="col-span-1 lg:hidden" />
	// 			<div className="col-span-3 relative pr-2">
	// 				<MultiSelect
	// 					className="col-span-2 border-[1px] border-gray-800"
	// 					options={permissionArray}
	// 					value={linked}
	// 					onChange={setLinked}
	// 					labelledBy="Select"
	// 				/>
	// 			</div>
	// 		</div>
	// 	</SingleAPILayout>
	// )

	return (
		<section className="pl-10 pt-6">
			<Loading loading={loading} />
			{/* <Heading>Assign Permissions to Role</Heading> */}
			<form action="" method="POST">
				<CustomSelectInput
					onChange={(e) => handleRoleId(e)}
					heading={"Role Name"}
					values={roleArray.map((each) => each.id)}
					options={roleArray.map((each) => each.name)}
				/>
				{/* {permissionArray?.map((each, index) => (
					<section
						key={each.id}
						className="flex my-4 mb-4 items-center justify-center "
					>
						<div className="px-4 text-lg font-medium font-lato">
							ID: {each.id}
						</div>
						<div className="px-8 font-nunito font-bold w-1/4">
							<div>API Name</div>
						</div>

						<div className="px-8 font-nunito w-1/4">
							<div>{each.label}</div>
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
				))} */}

				<div className="flex">
					{/* <div className="grid grid-cols-5">
						<div className="col-span-1 bg-red-500">
							<p className="ml-2 font-nunito">Permissions</p>
						</div>

						<MultiSelect
							className="col-span-2"
							options={permissionArray}
							value={linked}
							onChange={setLinked}
							labelledBy="Select"
						/>
					</div> */}
					<div className={`w-full grid grid-cols-5`}>
						<div>
							<p className="ml-2 font-nunito">Permissions</p>
						</div>
						<div className="col-span-1 lg:hidden" />
						<div className="col-span-3 relative pr-2">
							<MultiSelect
								className="col-span-2 border-[1px] border-gray-800"
								options={permissionArray}
								value={linked}
								onChange={setLinked}
								labelledBy="Select"
							/>
						</div>
					</div>
				</div>
				<CustomButton
					className="col-span-1"
					width={"1/3"}
					onClick={handleSubmit}
				>
					Assign Roles
				</CustomButton>
			</form>
		</section>
	);
};

export default LinkRoleAndPermissionsAPIComponent;
