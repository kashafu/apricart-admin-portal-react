import React, { useState } from "react";
import {
	createAndUpdatePermsissionApi,
	createAndUpdateRoleApi,
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

const CreateAndUpdatePermissionsAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");
	const [active, setActive] = useState("Y");

	const handleName = (e) => {
		setName(e.target.value);
	};
	const handleUrl = (e) => {
		setUrl(e.target.value);
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await createAndUpdatePermsissionApi(
			baseUrl,
			"",
			name,
			url,
			active,
			headers
		).then((response) => {
			console.log(response);
			checkStatus(response, "New Permission Created");
			setLoading(false);
		});
	};
	console.log(name, active);
	return (
		<section className="pl-10">
			<Loading loading={loading} />
			<Heading>Create a New Permission</Heading>
			<form action="" method="POST">
				<CustomInput
					heading={"Name"}
					placeholder={"Enter Permission Name"}
					value={name}
					onChange={(e) => handleName(e)}
				/>
				<CustomInput
					heading={"URL"}
					placeholder={"Enter API Url"}
					value={url}
					onChange={(e) => handleUrl(e)}
				/>
				<CustomSelectInput
					onChange={(e) => setActive(e.target.value)}
					heading={"Active/Inactive"}
					values={["Y", "N"]}
					options={["Yes", "No"]}
				/>
				<CustomButton width={"1/3"} onClick={handleSubmit}>
					Create New Permission
				</CustomButton>
			</form>
		</section>
	);
};

export default CreateAndUpdatePermissionsAPIComponent;
