import { useEffect, useState } from "react";
import { assignRoleApi, getAllRolesApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import SingleAPILayout from "../../Layouts/SingleAPILayout";
import CustomInput from "../../Misc/CustomInput";
import CustomSelectInput from "../../Misc/CustomSelectInput";

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
		setRoleId(e.target.value);
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await assignRoleApi(baseUrl, number, roleId, headers).then((response) => {
			setLoading(false);
		});
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
	}, [])

	return (
		<SingleAPILayout
			heading={"Assign Role to User"}
			loading={loading}
			buttonOnClick={(e) => handleSubmit(e)}
			buttonText={"Create Role"}
			rowItems={
				<>
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
				</>
			}
		/>
	)
}

export default AssignUserRoleAPIComponent