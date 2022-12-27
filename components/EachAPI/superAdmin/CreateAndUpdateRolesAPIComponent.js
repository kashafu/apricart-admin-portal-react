import React, { useState } from "react";
import { createAndUpdateRoleApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

const CreateAndUpdateRolesAPIComponent = () => {
	// create update as well
	// create update as well
	// create update as well
	// create update as well
	// create update as well
	// create update as well
	// create update as well
	// create update as well

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
				console.log(response);
				setLoading(false);
			}
		);
	};
	console.log(name, active);
	return (
		<section className="pl-10">
			<Loading loading={loading} />
			<Heading>Create a Role</Heading>
			<form action="" method="POST">
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
				<CustomButton width={"1/3"} onClick={handleSubmit}>
					Create Role
				</CustomButton>
			</form>
		</section>
	);
};

export default CreateAndUpdateRolesAPIComponent;
