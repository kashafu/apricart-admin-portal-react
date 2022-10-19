import React, { useEffect, useState } from "react";
import { assignRoleApi, getAllRolesApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

const AssignUserRoleAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [roleArray, setRoleArray] = useState([
		{
			name: "Loading...",
		},
	]);
	const [number, setNumber] = useState("");
	const [roleId, setRoleId] = useState(1);

	const handleNumber = (e) => {
		setNumber(e.target.value);
	};
	const handleRoleId = (e) => {
		console.log(e.target.value);
		setRoleId(e.target.value);
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await assignRoleApi(baseUrl, number, roleId, headers).then((response) => {
			console.log(response);
		});
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
			<Loading loading={loading} />
			<Heading>Assign Role to User</Heading>
			<form action="" method="POST">
				<CustomInput
					type={"number"}
					heading={"User Phone Number"}
					placeholder={"eg. 3331234567"}
					value={number}
					onChange={(e) => handleNumber(e)}
				/>
				<CustomSelectInput
					onChange={(e) => handleRoleId(e)}
					heading={"Role Id"}
					values={roleArray.map((each) => each.id)}
					options={roleArray.map((each) => each.name)}
				/>
				<CustomButton width={"1/3"} onClick={handleSubmit}>
					Assign Role
				</CustomButton>
			</form>
		</section>
	);
};

export default AssignUserRoleAPIComponent;
