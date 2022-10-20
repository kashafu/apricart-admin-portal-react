import React, { useEffect, useState } from "react";
import {
	createAndUpdateRoleApi,
	getAllRolesApi,
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

const UpdateRolesAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [active, setActive] = useState("Y");
	const [roleId, setRoleId] = useState("");
	const [roleArray, setRoleArray] = useState([
		{
			name: "Loading...",
		},
	]);

	const handleRoleId = (e) => {
		console.log(e.target.value);
		setRoleId(e.target.value);
	};

	const handleName = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await createAndUpdateRoleApi(baseUrl, name, active, roleId, headers).then(
			(response) => {
				console.log(response);
				checkStatus(response, "Role Data Updated");
				setLoading(false);
			}
		);
	};

	const getAllRoles = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllRolesApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "");
			status && setRoleArray(response.data.data);
			setLoading(false);
		});
	};

	useEffect(() => {
		getAllRoles();
	}, []);

	return (
		<section className="pl-10">
			<Loading loading={loading} />
			<Heading>Create a Role</Heading>
			<form action="" method="POST">
				<CustomSelectInput
					onChange={(e) => handleRoleId(e)}
					heading={"Role Id"}
					values={roleArray.map((each) => each.id)}
					options={roleArray.map((each) => each.name)}
				/>
				<CustomInput
					heading={"Name"}
					placeholder={"Enter New Name"}
					value={name}
					onChange={(e) => handleName(e)}
				/>
				<CustomSelectInput
					onChange={(e) => setActive(e.target.value)}
					heading={"Active/Inactive"}
					values={["Y", "N"]}
					options={["Yes", "No"]}
				/>
				<CustomButton width={"1/3"} onClick={handleSubmit}>
					Update Role
				</CustomButton>
			</form>
		</section>
	);
};

export default UpdateRolesAPIComponent;
