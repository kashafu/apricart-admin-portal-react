import React, { useState } from "react";
import { getAllPermissionsApi } from "../../../utils/ApiCalls";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import Heading from "../../Misc/Heading";

const GetAllActivePermissionsAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const handleSubmit = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await GetAllActivePermissionsAPIComponent(baseUrl, headers).then(
			(response) => {
				console.log(response);
				setLoading(false);
			}
		);
	};
	return (
		<section className="pl-10">
			<Loading loading={loading}></Loading>
			<Heading>Get All Active Permissions</Heading>
			<CustomButton width={"1/3"} onClick={handleSubmit}>
				Get All Active Permissions
			</CustomButton>
		</section>
	);
};

export default GetAllActivePermissionsAPIComponent;
