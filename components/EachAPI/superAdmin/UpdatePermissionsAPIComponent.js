import React, { useEffect, useState } from "react";
import {
	createAndUpdatePermsissionApi,
	createAndUpdateRoleApi,
	getAllPermissionsApi,
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

const UpdatePermissionsAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [permissionsArray, setPermissionsArray] = useState([{ id: "" }]);
	const [permissionId, setPermissionId] = useState("");
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");
	const [active, setActive] = useState("Y");

	const handleName = (e) => {
		setName(e.target.value);
	};
	const handleUrl = (e) => {
		setUrl(e.target.value);
	};
	const handlePermissionId = (e) => {
		setPermissionId(e.target.value);
		const requiredObject = permissionsArray.find(
			(each) => each.id == e.target.value
		);
		setUrl(requiredObject?.apiURL);
		setName(requiredObject?.apiName);
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

	const getAllPermissions = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllPermissionsApi(baseUrl, headers).then((response) => {
			console.log(response);
			let status = checkStatus(response, "");
			status && setPermissionsArray(response.data.data);
			setPermissionId(response.data.data[0].id);
			setUrl(response.data.data[0].apiURL);
			setName(response.data.data[0].apiName);
			setLoading(false);
		});
	};

	useEffect(() => {
		getAllPermissions();
	}, []);
	return (
		<section className="pl-10">
			<Loading loading={loading} />
			<Heading>Update a Permission</Heading>
			<form action="" method="POST">
				<CustomSelectInput
					onChange={(e) => handlePermissionId(e)}
					heading={"Permission Name"}
					values={permissionsArray.map((each) => each.id)}
					options={permissionsArray.map((each) => each.apiName)}
					position="top"
				/>
				<CustomInput
					heading={"New Name"}
					placeholder={"Enter New Name"}
					value={name}
					onChange={(e) => handleName(e)}
				/>
				<CustomInput
					heading={"New URL"}
					placeholder={"Enter New API Url"}
					value={url}
					onChange={(e) => handleUrl(e)}
				/>
				<CustomSelectInput
					onChange={(e) => setActive(e.target.value)}
					heading={"Active/Inactive"}
					values={["Y", "N"]}
					options={["Yes", "No"]}
					position="bottom"
				/>
				<CustomButton width={"1/3"} onClick={handleSubmit}>
					Create New Permission
				</CustomButton>

				{/* {details?.map((each) => (
				<section
					key={each.id}
					className="flex my-4 items-center justify-center mb-4"
				>
					<div className="px-4 text-lg font-medium font-lato">
						ID: {each.id}
					</div>
					<div className="px-8 font-nunito font-bold">
						<div>API Name</div>
						<div>API Endpoint</div>
						<div>Active</div>
					</div>

					<div className="px-8 font-nunito">
						<div>{each.apiName}</div>
						<div>{each.apiURL}</div>
						<div>{each.active}</div>
					</div>
				</section>
			))} */}
			</form>
		</section>
	);
};

export default UpdatePermissionsAPIComponent;
