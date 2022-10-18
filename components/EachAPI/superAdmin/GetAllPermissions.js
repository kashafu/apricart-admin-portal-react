import React from "react";
import { getAllRolesApi } from "../../../utils/ApiCalls";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import Heading from "../../Misc/Heading";

const GetAllPermissions = () => {
	const [loading, setLoading] = useState(false);
	const handleSubmit = async () => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllRolesApi(baseUrl, headers).then((response) => {
			console.log(response);
			setLoading(false);
		});
	};
	return (
		<section>
			<Loading loading={loading}></Loading>
			<Heading>Get All Roles</Heading>
			<CustomButton width={"1/3"} onClick={handleSubmit}>
				Get All Roles
			</CustomButton>
		</section>
	);
};

export default GetAllPermissions;
