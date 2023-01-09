import { useState } from "react";
import { createAndUpdateRoleApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
import SingleAPILayout from "../../Layouts/SingleAPILayout";
import CustomInput from "../../Misc/CustomInput";
import CustomSelectInput from "../../Misc/CustomSelectInput";

const CreateAndUpdateRolesAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [active, setActive] = useState("Y");

	const handleName = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await createAndUpdateRoleApi(baseUrl, name, active, "", headers).then(
			(response) => {
				setLoading(false);
			}
		);
	};

	return (
		<SingleAPILayout
			heading={"Create a Role"}
			loading={loading}
			buttonOnClick={(e) => handleSubmit(e)}
			buttonText={"Create Role"}
			rowItems={
				<>
					<CustomInput
						heading={"Name"}
						placeholder={"Enter Role Name"}
						value={name}
						onChange={(e) => handleName(e)}
					/>
					<CustomSelectInput
						onChange={(e) => setActive(e.target.value)}
						heading={"Active/Inactive"}
						values={["Y", "N"]}
						options={["Yes", "No"]}
					/>
				</>
			}
		/>
	)
}

export default CreateAndUpdateRolesAPIComponent
