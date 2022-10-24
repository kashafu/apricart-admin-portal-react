import React, { useEffect, useState } from "react";
import {
	createAndUpdateRoleApi,
	getAllRolesApi,
} from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
	sortAscending,
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
			console.log(response);
			let status = checkStatus(response, "");

			status && setRoleArray(sortAscending(response.data.data));
			setLoading(false);
		});
	};

	useEffect(() => {
		getAllRoles();
	}, [loading]);

	return (
		<section className="pl-10">
			<Loading loading={loading} />
			<Heading>Update Role</Heading>
			<form action="" method="POST">
				<CustomSelectInput
					onChange={(e) => handleRoleId(e)}
					heading={"Role"}
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

				{roleArray?.map((each) => (
					<section
						key={each.id}
						className="grid grid-cols-9 w-full my-4 items-center justify-center mb-4"
					>
						<div className="col-span-3" />

						<div className="col-span-1 px-8 font-nunito font-bold">
							<div>API Id</div>
							<div>API Name</div>
							<div>Active</div>
						</div>

						<div className="col-span-3 px-8 font-nunito">
							<div>{each.id}</div>
							<div>{each.name || "-"}</div>
							<div>{each.active}</div>
						</div>
						<div className="col-span-1" />
					</section>
				))}
			</form>
		</section>
	);
};

export default UpdateRolesAPIComponent;
